import React from "react"
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import jsmediatags from 'jsmediatags';
import 'react-h5-audio-player/lib/styles.css';
import "./audio-player.css";
import truncateString from "./truncateString";
function MusicPlayer(props){
  let [currentSongIndex, setCurrentSongIndex]=React.useState(0);
  let [title,setTitle] = React.useState("");
  let [artist, setArtist]=React.useState("");
  let [imageURL, setImageURL]=React.useState("");
  let [spinImage, setSpinImage] = React.useState(false);
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
      <button className="predict-button" onClick={()=>{console.log("Music Genre Predicted")}}>Predict Genre</button>
    </main>
  );
}

export default MusicPlayer;