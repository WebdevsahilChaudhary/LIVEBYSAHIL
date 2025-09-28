document.addEventListener('DOMContentLoaded', function() {
// Video elements
const video = document.getElementById('video');
const videoContainer = document.getElementById('video-container');
const countdownContainer = document.getElementById('countdown-container');

// Hide countdown and show video immediately  
countdownContainer.style.display = 'none';  
videoContainer.style.display = 'block';  
  
// Video source  
const videoSrc = "https://livecfdai-par-mp.slivcdn.com/out/v1/cfed49dc0449444bac761f9dd9155916/std_mdl-700300010_4.m3u8?hdntl=exp=1759108343~acl=*~hmac=80db74d673d5a5f092f5054106086be01eb3290fdecd260f267d29c75ea717a1&originpath=/linear/hls/pb/event/AiCi-L2OSQycd8KtHm0nIA/stream/65e15369-87f0-45bf-9c57-ce71d72700c9:SIN2/variant/5f3000588990fd69e822ee104cea52a4/bandwidth/1663838.m3u8";  
  
// Initialize player immediately  
function initializePlayer() {  
    if (Hls.isSupported()) {  
        const hls = new Hls();  
        hls.loadSource(videoSrc);  
        hls.attachMedia(video);  
        hls.on(Hls.Events.MANIFEST_PARSED, function() {  
            video.play().catch(e => {  
                console.error("Autoplay failed:", e);  
                // Show play button if autoplay fails  
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
  
// Start playback immediately  
initializePlayer();  
  
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
