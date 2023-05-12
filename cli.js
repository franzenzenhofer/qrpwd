import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const cli = (main) => {
  yargs(hideBin(process.argv))
  .scriptName('qrpwd')
  .usage('$0 <command> [options]')
  .command(
    'encode',
    'Create a QR code with encoded data',
    (yargs) => {
      yargs
        .option('m', {
          alias: 'message',
          type: 'string',
          description: 'Message to encode',
        })
        .option('d', {
          alias: 'debug',
          type: 'boolean',
          default: false,
          description: 'Enable debug mode for error reporting',
        })
        .option('f', {
          alias: 'file',
          type: 'string',
          description: 'File to encode',
        })
        .option('p', {
          alias: 'password',
          type: 'string',
          description: 'Password to encrypt data',
        })
        .option('s', {
          alias: 'silent',
          type: 'boolean',
          default: false,
          description: '',
        })
        .option('o', {
          alias: 'output',
          type: 'string',
          default: () =>
            new Date().toISOString().replace(/[:.]/g, '-') + '.qr.png',
          description: 'Output QR code file',
        })
        .option('u', {
          alias: 'unprotected',
          type: 'boolean',
          default: false,
          description: 'Do not use password protection',
        });
    },
    main
  )
  .command(
    'decode',
    'Decode data from a QR code',
    (yargs) => {
      yargs
        .option('i', {
          alias: 'input',
          type: 'string',
          demandOption: true,
          description: 'Input QR code file',
        })
        .option('f', {
          alias: 'file',
          type: 'string',
          description: 'Input QR code file',
        })
        .option('d', {
          alias: 'debug',
          type: 'boolean',
          default: false,
          description: 'Enable debug mode for error reporting',
        })
        .option('p', {
          alias: 'password',
          type: 'string',
          description: 'Password to decrypt data',
        })
        .option('s', {
          alias: 'silent',
          type: 'boolean',
          default: false,
          description: '',
        })
        .option('o', {
          alias: 'output',
          type: 'string',
          default: () =>
            new Date().toISOString().replace(/[:.]/g, '-') + '.txt',
          description: 'Output decoded data file',
        });
    },
    main
  )
  .demandCommand(1, 'You must provide a valid command')
  .help()
  .alias('h', 'help')
  .argv;
};
