function convertToPDF() {
    const files = document.getElementById('imageInput').files;
    if (files.length === 0) {
        alert('Please select image files to convert.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            if (index > 0) doc.addPage();
            doc.addImage(imgData, 'JPEG', 10, 10, 180, 160);
            if (index === files.length - 1) {
                const pdfBlob = doc.output('blob');
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = URL.createObjectURL(pdfBlob);
                downloadLink.download = 'converted_images.pdf';
                downloadLink.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    });
}