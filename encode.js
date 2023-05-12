// encode.js
import fs from 'fs/promises'; // Use fs/promises for async file operations
import QRCode from 'qrcode';
import CryptoJS from 'crypto-js';
import { exec } from 'child_process';

export const encode = async (d, pw, o, silent, filename) => {
  const combinedData = JSON.stringify({ data: d, filename });
  const ed = pw ? CryptoJS.AES.encrypt(combinedData, pw).toString() : combinedData;
  await QRCode.toFile(o, ed);
  if (!silent) {
    console.log(`QR code saved as ${o}`);
    exec(`open ${o}`);
  }
  return ed;
};
