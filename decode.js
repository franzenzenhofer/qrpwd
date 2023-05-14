import fs from 'fs/promises';
import { getQRCodeData } from './getqrcodedata.js';
import CryptoJS from 'crypto-js';
import { exec } from 'child_process';
import path from 'path';

export const decode = async (i, pw, o, silent, test_mode = false, debug = false) => {
  try {
    const qrCodeData = await getQRCodeData(i);
    if (!qrCodeData) {
      throw new Error('No QR code found in the image');
    }
    const ed = qrCodeData;
    const decrypted = pw ? CryptoJS.AES.decrypt(ed, pw).toString(CryptoJS.enc.Utf8) : ed;
    let decodedData;

    try {
      decodedData = JSON.parse(decrypted);
    } catch (error) {
      console.log("Couldn't decode the data as JSON, displaying as a string:");
      console.log(decrypted);
      return decrypted;
    }

    if (!silent || !test_mode) {
      let outputFile = decodedData.filename || o;

      try {
        await fs.stat(outputFile);
        const ext = path.extname(outputFile);
        const base = path.basename(outputFile, ext);
        const dir = path.dirname(outputFile);
        outputFile = path.join(dir, `${base}-${Date.now()}${ext}`);
      } catch (error) {
        // File does not exist, no need to change outputFile
      }

      console.log(`Decoded data: ${decodedData.data}`);
      await fs.writeFile(outputFile, decodedData.data);
      console.log(`Decoded data saved as ${outputFile}`);
      exec(`open ${outputFile}`);
    } else {
      if (!test_mode) {
        console.log(`Decoded data: ${decodedData.data}`);
      }
    }

    return decodedData;
  } catch (e) {
    if (debug) {
      console.error('Error decoding data:', e.message);
      console.log(e);
    } else {
      console.error('Error decoding data');
    }
  }
};