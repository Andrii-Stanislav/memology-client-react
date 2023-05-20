import { useState, useEffect, useMemo } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';

import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import sound from './fluffingADuck.mp3';

export const BackgroundAudio = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const myAudio = useMemo(() => new Audio(sound), []);

  useEffect(() => {
    myAudio.volume = 0.5;
    myAudio.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPlayToggle = () => {
    if (isPaused) {
      myAudio.play();
      setIsPaused(false);
    } else {
      myAudio.pause();
      setIsPaused(true);
    }
  };

  const onVolumeUp = () => {
    if (volume >= 1) return;
    const newVolume = (Math.round(volume * 10) + 1) / 10;
    setVolume(newVolume);
    myAudio.volume = newVolume;
  };

  const onVolumeMute = () => {
    if (volume <= 0.1) return;

    const newVolume = (Math.round(volume * 10) - 1) / 10;
    setVolume(newVolume);
    myAudio.volume = newVolume;
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 8, left: 8 }}
        icon={<AudiotrackIcon />}
      >
        <SpeedDialAction
          icon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
          tooltipTitle={isPaused ? 'Play' : 'Pause'}
          onClick={onPlayToggle}
        />

        <SpeedDialAction icon={Math.round(volume * 10)} tooltipTitle="Volume" />

        <SpeedDialAction
          icon={<VolumeMuteIcon />}
          tooltipTitle="Volume Mute"
          disableTouchListener={volume <= 0}
          onClick={onVolumeMute}
        />

        <SpeedDialAction
          icon={<VolumeUpIcon />}
          tooltipTitle="Volume Up"
          disableTouchListener={volume >= 1}
          onClick={onVolumeUp}
        />
      </SpeedDial>
    </>
  );
};
