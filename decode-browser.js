const MAX_RETRIES = 10;

async function getQRCodeData(dataUrl) {
  const codeReader = new ZXing.BrowserQRCodeReader();
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const result = await codeReader.decodeFromImageUrl(dataUrl);
      return result.text;
    } catch (e) {
      console.error(`Error decoding QR code (attempt ${i + 1}):`, e.message);
    }
  }
  throw new Error('Failed to decode QR code');
}

async function decodeBrowser(dataUrl, password) {
  try {
    const qrCodeData = await getQRCodeData(dataUrl);
    const encryptedData = qrCodeData;
    const decrypted = password ? CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8) : encryptedData;
    const decodedData = JSON.parse(decrypted);
    return decodedData;
  } catch (e) {
    console.error('Error decoding data:', e.message);
    throw e;
  }
}

async function handleDecode() {
  const inputFile = document.getElementById('input-file').files[0];
  const password = document.getElementById('password').value;
  const reader = new FileReader();
  reader.onload = async (event) => {
    const dataUrl = event.target.result;
    try {
      const decodedData = await decodeBrowser(dataUrl, password);
      document.getElementById('result-filename').textContent = `Filename: ${decodedData.filename}`;
      document.getElementById('result-message').textContent = `Message: ${decodedData.data}`;
    } catch (e) {
      document.getElementById('result-filename').textContent = 'Error decoding the file';
      document.getElementById('result-message').textContent = '';
    }
  };
  reader.readAsDataURL(inputFile);
}

document.getElementById('input-file').addEventListener('change', handleDecode);