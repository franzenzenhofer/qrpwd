// encode.js
import fs from 'fs/promises';
import QRCode from 'qrcode';
import CryptoJS from 'crypto-js';
import { exec } from 'child_process';

export const encode = async (d, pw, o, silent, filename) => {
  const combinedData = JSON.stringify({ data: d, filename });
  const ed = pw ? CryptoJS.AES.encrypt(combinedData, pw).toString() : combinedData;

  const qrOptions = { margin: 8, color: { dark: '#000', light: '#FFF' } };
  const pngDataURL = await QRCode.toDataURL(ed, qrOptions);

  await fs.writeFile(o, pngDataURL.replace(/^data:image\/png;base64,/, ''), { encoding: 'base64' });
  if (true) {
    console.log(`QR code saved as ${o}`);
    exec(`open ${o}`);
  }

  return ed;
};
