// decode.js
import fs from 'fs/promises';
import Jimp from 'jimp';
import QRCodeReader from 'qrcode-reader';
import CryptoJS from 'crypto-js';
import { exec } from 'child_process';
import path from 'path';

export const decode = async (i, pw, o, silent, test_mode = false) => {
  try {
    const img = await Jimp.read(i);
    const qr = new QRCodeReader();
    const data = new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      };
      qr.decode(img.bitmap);
    });

    const result = await data;
    const ed = result.result;
    const decrypted = pw ? CryptoJS.AES.decrypt(ed, pw).toString(CryptoJS.enc.Utf8) : ed;

    if (!decrypted) throw new Error('Invalid password or corrupted data');
    const decodedData = JSON.parse(decrypted);

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
      await fs.writeFile(outputFile, decodedData.data); // Use async writeFile
      console.log(`Decoded data saved as ${outputFile}`);
      exec(`open ${outputFile}`);
    } else {
      if (!test_mode) {
        console.log(`Decoded data: ${decodedData.data}`);
      }
    }
    return decodedData;
  } catch (e) {
    console.error('Error decoding data:', e.message);
    console.log(e);
  }
};
