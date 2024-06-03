const audioPlayer = document.getElementById('audio-player');

fetch('assets/audio/background.mp3')
  .then(response => response.blob())
  .then(blob => {
    const audio = document.createElement('audio');
    const audioSource = document.createElement('source');

    audioSource.src = URL.createObjectURL(blob);
    audioSource.type = 'audio/mpeg';

    audio.appendChild(audioSource);
    audio.controls = none;
    audio.autoplay = true;
    audio.loop = true;

    audioPlayer.appendChild(audio);
  })
  .catch(error => console.error('Error fetching audio:', error));