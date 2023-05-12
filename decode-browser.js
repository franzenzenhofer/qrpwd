async function getQRCodeData(dataUrl, retries = 10) {
  const codeReader = new ZXing.BrowserQRCodeReader();
  for (let i = 0; i < retries; i++) {
    try {
      const result = await codeReader.decodeFromImageUrl(dataUrl);
      return result.text;
    } catch (e) {
      console.error(`Error decoding QR code (attempt ${i + 1}):`, e.message);
    }
  }
  return null;
}

async function decodeBrowser(dataUrl, password) {
  try {
    const qrCodeData = await getQRCodeData(dataUrl);
    if (!qrCodeData) {
      throw new Error('No QR code found in the image');
    }
    const encryptedData = qrCodeData;
    const decrypted = password ? CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8) : encryptedData;
    const decodedData = JSON.parse(decrypted);
    return decodedData;
  } catch (e) {
    console.error('Error decoding data:', e.message);
  }
}

window.handleDecode = async function handleDecode() {
  const inputFile = document.getElementById('input-file').files[0];
  const password = document.getElementById('password').value;
  const reader = new FileReader();
  reader.onload = async (event) => {
    const dataUrl = event.target.result;
    const decodedData = await decodeBrowser(dataUrl, password);
    if (decodedData) {
      document.getElementById('result-filename').textContent = `Filename: ${decodedData.filename}`;
      document.getElementById('result-message').textContent = `Message: ${decodedData.data}`;
    } else {
      document.getElementById('result-filename').textContent = 'Error decoding the file';
      document.getElementById('result-message').textContent = '';
    }
  };
  reader.readAsDataURL(inputFile);
};
