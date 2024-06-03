function loadLyrics() {
    fetch('/assets/lyrics/heartbeat.lrc')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            const lyricsContainer = document.getElementById('lyrics-container');
            const audio = document.getElementById('bg-audio');
            const lyrics = [];

            lines.forEach(line => {
                const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
                if (match) {
                    const minutes = parseInt(match[1]);
                    const seconds = parseInt(match[2]);
                    const milliseconds = parseInt(match[3].padEnd(3, '0'));
                    const time = ((minutes * 60 + seconds) * 1000 + milliseconds) + 1450;
                    const text = match[4];
                    lyrics.push({ time, text });
                }
            });

            audio.addEventListener('timeupdate', () => {
                const currentTime = audio.currentTime * 1000;

                for (let i = 0; i < lyrics.length; i++) {
                    if (currentTime >= lyrics[i].time && (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)) {
                        lyricsContainer.innerHTML = lyrics[i].text;
                        break;
                    }
                }
            });
        })
        .catch(error => console.error('Error loading lyrics:', error));
}
