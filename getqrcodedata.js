import * as ZXing from '@zxing/library';
import Jimp from 'jimp';
import fs from 'fs/promises';

export async function getQRCodeData(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    const { data: imageData, width, height } = image.bitmap;

    // Convert to luminance
    const luminance = new Uint8ClampedArray(width * height);
    for (let i = 0; i < imageData.length; i += 4) {
      let r = imageData[i];
      let g = imageData[i + 1];
      let b = imageData[i + 2];
      let avg = (r + g + b) / 3;
      luminance[i / 4] = avg;
    }

    const luminanceSource = new ZXing.RGBLuminanceSource(luminance, width, height);
    const binaryBitmap = new ZXing.BinaryBitmap(new ZXing.HybridBinarizer(luminanceSource));

    const hints = new Map();
    const formats = [ZXing.BarcodeFormat.QR_CODE, ZXing.BarcodeFormat.DATA_MATRIX];

    hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true);

    const reader = new ZXing.MultiFormatReader();
    const result = reader.decode(binaryBitmap, hints);

    return result.getText();
  } catch (err) {
    console.error('No QR code found in the image:', err);
    return false;
  }
}
