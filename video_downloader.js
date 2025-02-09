function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        alert('Please enter a video URL.');
        return;
    }

    // Use the provided SaveFrom link
    const downloadLink = document.getElementById('downloadLink');
    const externalLink = `https://savefrom.in.net/youtube-video-downloader?url=${encodeURIComponent(videoUrl)}`;
    downloadLink.href = externalLink;
    downloadLink.style.display = 'block'; // Show the download link

    // Show the instruction text
    const instructionText = document.getElementById('instructionText');
    instructionText.style.display = 'block'; // Display the instruction text
}