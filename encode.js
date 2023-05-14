import fs from 'fs/promises';
import QRCode from 'qrcode';
import CryptoJS from 'crypto-js';
import { exec } from 'child_process';

export const encode = async (d, pw, o, silent, filename, debug = false) => {
  try {

      // Calculate the maximum number of characters that can be encoded in a QR code
      const qrVersion = QRCode.qrcode.qrVersions(QRCode.qrcode.QRErrorCorrectLevel.H)[9];
      const maxDataLength = qrVersion.totalDataCodewords * 8;
  
      // Limit the data to encode to 80% of the maximum data length
      const maxEncodedDataLength = Math.floor(maxDataLength * 0.8);
      const limitedData = d.slice(0, maxEncodedDataLength);
      
    const combinedData = JSON.stringify({ data: d, filename });
    const ed = pw ? CryptoJS.AES.encrypt(combinedData, pw).toString() : combinedData;

    const qrOptions = { margin: 8, color: { dark: '#000', light: '#FFF' } };
    const pngDataURL = await QRCode.toDataURL(ed, qrOptions);

    await fs.writeFile(o, pngDataURL.replace(/^data:image\/png;base64,/, ''), { encoding: 'base64' });
    if (!silent) {
      console.log(`QR code saved as ${o}`);
      exec(`open ${o}`);
    }

    return ed;
  } catch (e) {
    if (debug) {
      console.error('Error encoding data:', e.message);
      console.log(e);
    } else {
      console.error('Error encoding data');
    }
  }
};