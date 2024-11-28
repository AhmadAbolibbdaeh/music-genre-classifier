import './App.css';
import React from "react"
import MusicPlayer from './MusicPlayer';
import FileInput from './FileInput';
import truncateString from './truncateString';
function App() {
  let [showMusicPlayer, setShowMusicPlayer] = React.useState(false);
  let [songList, setSongList]=React.useState([]);
  let [songsURLsList, setSongsURLsList] = React.useState([]);
  function handleInputFilesList (songListPara){

    //The following line stores the URLS of each song of the song list
    Array.from(songListPara).forEach((item) => {
      setSongsURLsList((prev) => 
        [
          ...prev,
          URL.createObjectURL(item)
        ]
      );
    });
    //The following line updates the state with the songList
    setSongList((prev)=> [
      ...prev,
      ...Array.from(songListPara)
    ]
    );

    //Show the Music Player component
    setShowMusicPlayer(true);
  }


  return (
    <div>
      {!showMusicPlayer &&<FileInput handleInputFilesList={handleInputFilesList}/>}
      {showMusicPlayer && <MusicPlayer songList={songList} songsURLsList={songsURLsList}/>}
    </div>
  );
}

export default App;
