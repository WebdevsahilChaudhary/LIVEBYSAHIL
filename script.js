document.addEventListener('DOMContentLoaded', function() {
    // Video elements
    const video = document.getElementById('video');
    const videoContainer = document.getElementById('video-container');
    
    // Video source
    const videoSrc = "https://002.fclplayer.online/live/csstream2/playlist.m3u8?id=1002";
    
    // Initialize player immediately
    function initializePlayer() {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(e => {
                    console.error("Autoplay failed:", e);
                    video.controls = true;
                });
            });
            
            hls.on(Hls.Events.ERROR, function(event, data) {
                if (data.fatal) {
                    showError("Stream error occurred. Please refresh the page.");
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } else {
            showError("Your browser doesn't support this stream format.");
        }
    }

    // Disable seeking
    function disableSeek() {
        video.addEventListener('timeupdate', function() {
            if (video.currentTime > video.lastTime) {
                video.currentTime = video.lastTime;
            }
            video.lastTime = video.currentTime;
        });

        video.addEventListener('seeking', function() {
            video.currentTime = video.lastTime; // Prevent seeking
        });
    }

    // Start playback immediately
    initializePlayer();
    
    // Apply seek disable function
    video.addEventListener('loadedmetadata', disableSeek);

    // Error display function
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff3333';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
        errorDiv.style.borderRadius = '5px';
        
        videoContainer.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});
