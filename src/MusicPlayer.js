/* global ml5 */
import React from "react"
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import jsmediatags from 'jsmediatags';
import 'react-h5-audio-player/lib/styles.css';
import "./audio-player.css";
import truncateString from "./truncateString";
import data from "./dataset.js"
import extractFeaturesFromBlobURL from "./extractFeatureFromBlobURL.js";

function MusicPlayer(props){
  let [currentSongIndex, setCurrentSongIndex]=React.useState(0);
  let [title,setTitle] = React.useState("");
  let [artist, setArtist]=React.useState("");
  let [imageURL, setImageURL]=React.useState("");
  let [spinImage, setSpinImage] = React.useState(false);
  let [brain, setBrain]= React.useState(null);
  //Extracting Song's Metadata
  React.useEffect(() => {
    let base64String ="";
    jsmediatags.read(props.songList[currentSongIndex], {
      onSuccess: function(tag) {
        setTitle(tag.tags.title);
        setArtist(tag.tags.artist);
        for(let i=0; i< tag.tags.picture.data.length; i++){
          base64String += String.fromCharCode(tag.tags.picture.data[i]);
        }
        setImageURL(`data:${tag.tags.picture.format};base64,${btoa(base64String)}`)

      },
      onError: function(error) {
        console.log(error);
      }
    });
  }, [currentSongIndex, props.songsURLsList]);

  //Handling Buttons
  function handlePlayButton(){
    setSpinImage(true);
  }

  function handlePauseButton(){
    setSpinImage(false);
  }

  function handleNextButton(){
    setCurrentSongIndex((prev) => (prev + 1) % props.songsURLsList.length);
  }

  function handlePreviousButton(){
    setCurrentSongIndex((prev) => (prev - 1 + props.songsURLsList.length) % props.songsURLsList.length);
  }

  async function handlePredict() {
    const blobURL = props.songsURLsList[currentSongIndex];
    const features = await extractFeaturesFromBlobURL(blobURL);
    console.log("Features are");
    console.log(features);
    console.log("Brain is");
    console.log(brain);
    if (brain && features) {
      brain.classify(features, (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Prediction results:', results);
        }
      });
    }
  }
  


  //Machine Learning Code Starts here 
  React.useEffect(()=>{
    //Parsing JSON dataset
    const dataset = JSON.parse(JSON.stringify(data));
    //Setting backend to webgl
    ml5.setBackend("webgl");

    //Initializing The Neuarl Network
     let brainVar = ml5.neuralNetwork({
      inputs: [ 'chroma_stft_mean', 'chroma_stft_var', 'rms_mean', 'rms_var', 'spectral_centroid_mean', 'spectral_centroid_var', 'spectral_bandwidth_mean', 'spectral_bandwidth_var', 'rolloff_mean', 'rolloff_var', 'zero_crossing_rate_mean', 'zero_crossing_rate_var', 'harmony_mean', 'harmony_var', 'perceptr_mean', 'perceptr_var', 'tempo', 'mfcc1_mean', 'mfcc1_var', 'mfcc2_mean', 'mfcc2_var', 'mfcc3_mean', 'mfcc3_var', 'mfcc4_mean', 'mfcc4_var', 'mfcc5_mean', 'mfcc5_var', 'mfcc6_mean', 'mfcc6_var', 'mfcc7_mean', 'mfcc7_var', 'mfcc8_mean', 'mfcc8_var', 'mfcc9_mean', 'mfcc9_var', 'mfcc10_mean', 'mfcc10_var', 'mfcc11_mean', 'mfcc11_var', 'mfcc12_mean', 'mfcc12_var', 'mfcc13_mean', 'mfcc13_var', 'mfcc14_mean', 'mfcc14_var', 'mfcc15_mean', 'mfcc15_var', 'mfcc16_mean', 'mfcc16_var', 'mfcc17_mean', 'mfcc17_var', 'mfcc18_mean', 'mfcc18_var', 'mfcc19_mean', 'mfcc19_var', 'mfcc20_mean', 'mfcc20_var'],
      outputs: ['label'],
      task: "classification",
      debug: true
    });


    //Adding data(features) to the neural network
    dataset.forEach((item)=>{
      brainVar.addData(item, {label: item.label});
    });

    //Normalizing the data
    brainVar.normalizeData();

    //Training the model
    const trainingOptions = { 
      epochs: 10, 
      batchSize: 12 }

    brainVar.train(trainingOptions, ()=>{
      console.log("Model Training Finished");
      setBrain(brainVar);
    });
  },[currentSongIndex])

  return (
    <main>      
      <div className={spinImage ? "song-image-container" : "no-spining-song-image-container"}>
        <img src={imageURL} alt="Track"></img>
      </div>

      <div className="song-info">
      <p className="title">{truncateString(title,22)}
      </p>
      <p className="artist">{truncateString(artist,20)}</p>
      </div>

      <div className="audio-player-component">
      <AudioPlayer 
      src={props.songsURLsList[currentSongIndex]}
      loop
      autoPlay={false}
      onPlay={handlePlayButton}
      onPause={handlePauseButton}
      onClickNext={handleNextButton}
      onClickPrevious={handlePreviousButton}
      showSkipControls={true}
      showJumpControls={false}
      />
      </div>
      <button className="predict-button" onClick={handlePredict}>Predict Genre</button>
    </main>
  );
}

export default MusicPlayer;