# qrpwd - Encode to QR-Code

A simple command line tool to encode and decode textual information with strong encryption using a given password in a QR code.

## Installation

1. Clone the repository or download the source files.
2. Navigate to the project directory and run `npm install`.

## Usage

### Encode

To encode a message:

```
node qrpwd.js encode -m "your message" -p "your_password" -o output.png
```

To encode a file:

```
node qrpwd.js encode -f input.txt -p "your_password" -o output.png
```

### Decode

To decode an encrypted QR code:

```
node qrpwd.js decode -i input.png -p "your_password"
```

## Parameters

- `-m` or `--message`: The message to encode.
- `-f` or `--file`: The file to encode.
- `-p` or `--password`: The password to encrypt/decrypt the data (required).
- `-o` or `--output`: The output file for the QR code (default: timestamped .png file).
- `-i` or `--input`: The input QR code image file (required for decoding).
