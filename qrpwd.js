#!/usr/bin/env node
import fs from 'fs/promises'; // Use fs/promises for async file operations
import { encode } from './encode.js';
import { decode } from './decode.js';
import { signQRCode } from './sign.js';
import { testDecode } from './decode-test.js';
import { cli } from './cli.js';
import path from 'path';
import { setTimeout } from 'timers/promises';

export const main = async (args) => {
  const { _, message, input, password, silent, output, debug } = args;
 const handleEncode = async (data, outputPath, silent, filename, debug) => {
  let attempts = 0;
  let qrFile;
  let success = false;

  while (attempts < 20 && !success) {
    qrFile = await encode(data, password, outputPath, silent, filename, debug);
    await signQRCode(outputPath, outputPath, outputPath);
    await setTimeout(200);

    success = await testDecode(data, filename, password, outputPath, debug);
    if (success) {
      success = await testDecode(data, filename, password, outputPath, debug); // Repeat the test
    }

    if (!success) {
      if (debug) {
        console.error('Error during decode test, retrying...');
      }
      attempts++;
    }
  }

  if (success) {
    console.log('Decode test passed successfully');
  } else {
    console.error('Error during decode test, giving up after 20 attempts');
  }
};
  

  if (_[0] === 'encode') {
    if (message) {
      const filename = output.replace('.png', '.txt');
      await handleEncode(message, output, silent, filename, debug);
    } else if (input) {
      try {
        const d = await fs.readFile(input, 'utf8');
        await handleEncode(d, output, silent, path.basename(input), debug);
      } catch (e) {
        console.error('Error reading file:', e.message);
      }
    } else {
      console.error('You must provide a message or a file to encode');
    }
  } else if (_[0] === 'decode') {
    if (input) {
      await decode(input, password || '', output, silent, false, debug);
    } else {
      console.error('You must provide an input file using -i');
    }
  }
};

cli(main);
