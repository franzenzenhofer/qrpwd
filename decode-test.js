// decode-test.js
import { decode } from './decode.js';

export const testDecode = async (data, filename, password, outputPath) => {
  try {
    const decodedData = await decode(outputPath, password, null, true, true);
    return decodedData.data === data && decodedData.filename === filename;
  } catch (error) {
    return false;
  }
};

