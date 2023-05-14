function generateQRCode() {
  const inputText = document.getElementById('input-text').value;
  const password = document.getElementById('password-encode').value;

  // Check if password is set
  if (!password) {
    const passwordError = document.getElementById('password-error');
    passwordError.style.display = 'block';
    return;
  }

// Get the filename from the input element, or use a default filename
const filenameInput = document.getElementById('filename-encode');
let filename = filenameInput.value.trim() || `qrpwd-online-${Date.now()}`;

// Add .txt extension if filename doesn't have .txt or .md extension
if (!/\.(txt|md)$/.test(filename)) {
  filename += '.txt';
}
  const data = JSON.stringify({ filename: filename, data: inputText });

  // Encrypt the JSON object with the password
  const encryptedData = CryptoJS.AES.encrypt(data, password).toString();

  // Generate the QR code with the encrypted data
  const qr = qrcode(0, 'M');
  qr.addData(encryptedData);
  qr.make();

// Create a canvas element to draw the QR code image
const canvas = document.createElement('canvas');
const moduleSize = 10;
const margin = 50;
canvas.width = qr.getModuleCount() * moduleSize + margin * 2;
canvas.height = qr.getModuleCount() * moduleSize + margin * 2;
canvas.style.display = 'none';
document.body.appendChild(canvas);

// Draw the QR code image on the canvas
const context = canvas.getContext('2d');
const qrImage = new Image();

qrImage.onload = function() {
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const qrSize = qrImage.width;
  const x = (canvas.width - qrSize) / 2;
  const y = (canvas.height - qrSize) / 2;
  context.drawImage(qrImage, x, y, qrSize, qrSize);
  context.font = 'normal 16px monospace';
  context.fillStyle = '#000';
  context.fillText('qrpwd', 1, 1 + 16);
  context.fillText(filename.split('.')[0], 1, canvas.height - 4);
  const pngImage = canvas.toDataURL('image/png');


    // Set the download link
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = pngImage;
    downloadLink.download = filename.replace('.txt', '.png');
    downloadLink.style.display = 'block';

    // Clear the previous results
    const resultQr = document.getElementById('result-qr');
    resultQr.innerHTML = '';

    // Append the QR code image to the results
    const qrImageElement = document.createElement('img');
    qrImageElement.src = pngImage;
    resultQr.appendChild(qrImageElement);

    // Remove the canvas element
    document.body.removeChild(canvas);
  };
  qrImage.src = qr.createDataURL(moduleSize, 0);
}

document.getElementById('encode').addEventListener('click', generateQRCode);