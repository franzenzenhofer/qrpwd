# qrpwd - Encode to QR-Code

qrpwd is a command-line tool that allows you to encode and decode textual information with strong encryption using a given password in a QR code. The tool is designed to be secure and convenient, making it ideal for storing sensitive information such as 2-factor authentication (2FA) backup codes.

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
- `-s` or `--silent`: Suppress console output (default: false).
- `-u` or `--unprotected`: Generate an unprotected QR code (default: false).
- `-d` or `--debug`: Enable debug mode (default: false).

For more information, refer to the [GitHub repository](https://github.com/franzenzenhofer/qrpwd).

## Use Cases

Here are some possible use cases for qrpwd:

- Creating QR codes for events or promotions that require a password for access.
- Generating QR codes for Wi-Fi networks that require a password for access.
- Creating QR codes for password protected contact information that can be easily shared with others.
- Generating QR codes for URLs that require a password for access.
- Creating QR codes for loyalty programs that require a password for access.
- Generating QR codes for surveys or feedback forms that require a password for access.

