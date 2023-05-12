// sign.js
import Jimp from 'jimp';
import fs from 'fs/promises';

export const signQRCode = async (inputPath, outputPath, qrFilename) => {
  const image = await Jimp.read(inputPath);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK); // Load a readable font

  // Add a semi-transparent background to the text for better readability
  const backgroundColor = 0x00000080;
  const padding = 5;

  // Write "qrpwd" at the top left corner within the white margin
  image.print(font, padding, padding, 'qrpwd');

  // Write the filename at the left bottom corner within the white margin
  image.print(font, padding, image.bitmap.height - 16 - padding, qrFilename.replace('.png', ''));

  // Remove the existing file before writing a new one, if it exists
  try {
    await fs.rm(outputPath, { force: true });
  } catch (error) {
    // Ignore the error if the file doesn't exist
  }

  await image.writeAsync(outputPath);
};
