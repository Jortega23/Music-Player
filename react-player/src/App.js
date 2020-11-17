import React, {useState} from 'react'
import './styles/app.scss'
//Adding components
import Player from './components/Player';
import Song from './components/Song';
//Import util.js
import data from './util.js'

function App() {
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] =useState(false);
   
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
    </div>
  );
}

export default App;
