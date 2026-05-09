document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-trigger');
    const loader = document.getElementById('loader-section');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('loading-status');
    const overlay = document.getElementById('jumpscare-overlay');
    const audio = document.getElementById('scream-audio');

    const startFullscreen = () => {
        const doc = document.documentElement;
        if (doc.requestFullscreen) doc.requestFullscreen();
        else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
    };

    const runLoadingSequence = () => {
        playBtn.classList.add('hidden');
        loader.classList.remove('hidden');
        
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                triggerJumpscare();
            } else {
                width += Math.random() * 2;
                if (width > 100) width = 100;
                
                progressBar.style.width = width + '%';
                
                if (width > 30) statusText.innerText = "Loading video stream...";
                if (width > 70) statusText.innerText = "Optimizing quality...";
                if (width > 90) statusText.innerText = "Starting playback...";
            }
        }, 50); 
    };

    const triggerJumpscare = () => {
        overlay.classList.remove('hidden');
        audio.volume = 1.0;
        audio.play().catch(e => console.error(e));
        document.body.classList.add('extreme-vibrate');

        if ("vibrate" in navigator) {
            navigator.vibrate([400, 100, 400, 100, 700]);
        }
    };

    playBtn.addEventListener('click', () => {
        startFullscreen();
        runLoadingSequence();
    });
});