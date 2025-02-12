// Initialize jsPDF
const { jsPDF } = window.jspdf;

// DOM Elements
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const convertBtn = document.getElementById('convert-btn');
const downloadBtn = document.getElementById('download-btn');

let images = [];

// Event Listener for File Input
fileInput.addEventListener('change', (e) => {
  document.querySelector('.actions').style.display = '';
  images = [];
  imagePreview.innerHTML = '';
  const files = e.target.files;

  if (files.length > 0) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        imagePreview.appendChild(img);
        images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });

    convertBtn.disabled = false;
  }
});

// Convert Images to PDF
convertBtn.addEventListener('click', () => {
  const doc = new jsPDF();

  images.forEach((img, index) => {
    if (index > 0) doc.addPage();
    doc.addImage(img, 'JPEG', 10, 10, 190, 0);
  });

  const pdfUrl = doc.output('bloburl');
  downloadBtn.disabled = false;

  // Download PDF
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'converted.pdf';
    link.click();
  });
});
