import React, { useRef, useState }from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft,faPause, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    //If we need to target a specific html element
    //In the specific component can use 
    //useRef
    const audioRef = useRef(null);

    //State-------------------------------------------------->
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
    })

    //eventhandlers------------------------------------------>
    const playSongHandler = () => {
      if(isPlaying) {
        audioRef.current.pause()
        setIsPlaying(!isPlaying)
      }else {
        audioRef.current.play()
        setIsPlaying(!isPlaying)
      }
    };

    const timeUpdateHandler = (e) => {
      const current = e.target.currentTime
      const duration = e.target.duration
      setSongInfo({...songInfo, currentTime: current, duration: duration})
    };

    const getTime = (time) => {
      return(
        Math.floor(time / 60) + ':' +('0' + Math.floor(time % 60)).slice(-2)
      )
    };

    const dragHandler = (e) =>{
      audioRef.current.currentTime = e.target.value
      setSongInfo({...songInfo, currentTime: e.target.value})
    }

    return (
      <div className='player'>
        <div className='time-control'>
          <p>{getTime(songInfo.currentTime)}</p>
          <input 
            min={0} 
            max={songInfo.duration} 
            value={songInfo.currentTime}
            onChange={dragHandler} 
            type='range' 
          />
          <p>{getTime(songInfo.duration)}</p>
        </div>
        
        <div className="play-control">
          <FontAwesomeIcon 
            className='skip-back' 
            icon={faAngleLeft} 
            size='2x'
          />
          <FontAwesomeIcon 
            onClick={playSongHandler} 
            className='play' 
            icon={isPlaying ? faPause : faPlay} 
            size='2x'
          />
          <FontAwesomeIcon 
            className='skip-forward' 
            icon={faAngleRight} 
            size='2x'
          />
        </div>
        <audio 
          onTimeUpdate={timeUpdateHandler} 
          onLoadedMetadata={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio}
        ></audio>
      </div>
    )
}

export default Player
