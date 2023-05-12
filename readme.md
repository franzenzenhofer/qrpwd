# qrpwd - Encode to QR-Code

![Test Image](test.png)

A simple command line tool to encode and decode textual information with strong encryption using a given password in a QR code.

## Installation

To install qrpwd, follow these steps:

1. Clone the repository or download the source files.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm link` to make it a global command line tool.

## Usage

### Encode

To encode a message:

```bash
qrpwd encode -m "your message" -p "your_password" -o output.png
```

To encode a file:

```bash
qrpwd encode -f input.txt -p "your_password" -o output.png
```

### Decode

To decode an encrypted QR code:

```bash
qrpwd decode -i input.png -p "your_password"
```

## Parameters

- `-m` or `--message`: The message to encode.
- `-f` or `--file`: The file to encode.
- `-p` or `--password`: The password to encrypt/decrypt the data (required).
- `-o` or `--output`: The output file for the QR code (default: timestamped .png file).
- `-i` or `--input`: The input QR code image file (required for decoding).

For more information, refer to the [GitHub repository](https://github.com/franzenzenhofer/qrpwd).

To try the qrpwd Online Decoder, visit the [online decode page](https://franzenzenhofer.github.io/qrpwd/).
