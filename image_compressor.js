document.getElementById('compressionRange').addEventListener('input', function() {
    document.getElementById('compressionValue').textContent = this.value + '%';
});

function compressImage() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length === 0) {
        alert('Please select an image to compress.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            // Scale image
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            // Draw the image to the canvas and compress
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Get the compressed image data based on slider value
            const compressionQuality = document.getElementById('compressionRange').value / 100;
            const compressedDataUrl = canvas.toDataURL('image/jpeg', compressionQuality); // JPEG format with user-defined quality
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = compressedDataUrl;
            downloadLink.download = 'compressed_image.jpg';
            downloadLink.style.display = 'block'; // Show the download link
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}