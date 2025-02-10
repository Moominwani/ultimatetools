function updateFields() {
  var qrType = document.getElementById('qrType').value;
  var inputFields = document.getElementById('inputFields');

  inputFields.innerHTML = "";

  if (qrType === "text" || qrType === "url" || qrType === "phone" || qrType === "email") {
    var inputType = (qrType === "phone") ? "tel" : "text";
    var placeholderText = (qrType === "phone") ? "Enter Phone Number" :
      (qrType === "email") ? "Enter Email" :
      (qrType === "url") ? "Enter Website URL" :
      "Enter Text";
    inputFields.innerHTML = `<input type="${inputType}" id="qrText" placeholder="${placeholderText}">`;
  }
  else if (qrType === "vcard") {
    inputFields.innerHTML = `
            <input type="text" id="name" placeholder="Enter Full Name">
            <input type="tel" id="phone" placeholder="Enter Phone Number">
            <input type="email" id="email" placeholder="Enter Email">
            <input type="text" id="address" placeholder="Enter Address">
        `;
  }
}

function generateQRCode() {
  var qrType = document.getElementById('qrType').value;
  var qrData = "";

  if (qrType === "text" || qrType === "url" || qrType === "phone" || qrType === "email") {
    qrData = document.getElementById('qrText').value;
    if (qrType === "phone") qrData = "tel:" + qrData;
    if (qrType === "email") qrData = "mailto:" + qrData;
    if (qrType === "url" && !qrData.startsWith("http")) qrData = "https://" + qrData;
  }
  else if (qrType === "vcard") {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;

    qrData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
ADR:${address}
END:VCARD`;
  }

  var canvas = document.getElementById('qrCanvas');
  var ctx = canvas.getContext('2d');

  canvas.width = 300;
  canvas.height = 300;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var qr = new QRCode(document.createElement('div'), {
    text: qrData,
    width: 250,
    height: 250
  });

  setTimeout(() => {
    ctx.drawImage(qr._el.firstChild, 25, 25);
    document.getElementById('downloadBtn').style.display = 'block';
  }, 100);
}

function downloadQRCode() {
  var canvas = document.getElementById('qrCanvas');
  var link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "qr_code.png";
  link.click();
}

updateFields();