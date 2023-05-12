#!/usr/bin/env node
import fs from 'fs/promises'; // Use fs/promises for async file operations
import { encode } from './encode.js';
import { decode } from './decode.js';
import { testDecode } from './decode-test.js';
import { cli } from './cli.js';
import path from 'path';
import { setTimeout } from 'timers/promises';

export const main = async (args) => {
  const { _, m, f, p, s, o, u, i } = args;
  const password = u ? '' : p;

  
  const handleEncode = async (data, outputPath, silent, filename) => {
    let attempts = 0;
    let qrFile;
    let success = false;
  
    while (attempts < 10 && !success) {
      qrFile = await encode(data, password, outputPath, silent, filename);
      await setTimeout(500);
  
      success = await testDecode(data, filename, password, outputPath);
      if (success) {
        success = await testDecode(data, filename, password, outputPath); // Repeat the test
      }
  
      if (!success) {
        console.error('Error during decode test, retrying...');
        attempts++;
      }
    }
  
    if (success) {
      console.log('Decode test passed successfully');
    } else {
      console.error('Error during decode test, giving up after 10 attempts');
    }
  };
  

  if (_[0] === 'encode') {
    if (m) {
      const filename = o.replace('.png', '.txt');
      await handleEncode(m, o, s, filename);
    } else if (f) {
      try {
        const d = await fs.readFile(f, 'utf8');
        await handleEncode(d, o, s, path.basename(f));
      } catch (e) {
        console.error('Error reading file:', e.message);
      }
    } else {
      console.error('You must provide a message or a file to encode');
    }
  } else if (_[0] === 'decode') {
    await decode(i, p || '', o, s);
  }
};

cli(main);
