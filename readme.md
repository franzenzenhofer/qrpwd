<p align="center">
  <img src="./qrpwd-logo.png" alt="qrpwd logo" width="250" height="250">
</p>

# qrpwd - Encode to QR-Code

qrpwd is a command-line tool that allows you to encode and decode textual information with strong encryption using a given password in a QR code. The tool is designed to be secure and convenient, making it ideal for storing sensitive information such as 2-factor authentication (2FA) backup codes.

![Test QR Code](test.png)

To decode the QR code online, you can use the following link: [https://qrpwd.franzai.com/](https://qrpwd.franzai.com/). Simply upload the `test.png` file and enter the password "test" to decode the message.

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
qrpwd encode -m "your message" -p your_password -o output.png
```

To encode a file:

```bash
qrpwd encode -i input.txt -p your_password -o output.png
```

### Decode

To decode an encrypted QR code:

```bash
qrpwd decode -i input.png -p your_password
```

## Parameters

 The `qrpwd` CLI has two commands: `encode` and `decode`.

The `qrpwd encode` command has the following options:
- `-m` or `--message`: Message to encode
- `-i` or `--input`: Input file to encode
- `-p` or `--password`: Password to encrypt data
- `-o` or `--output`: Output QR code file
- `-u` or `--unprotected`: Do not use password protection
- `-d` or `--debug`: Enable debug mode for error reporting

The `qrpwd decode` command has the following options:
- `-i` or `--input`: Input QR code file
- `-p` or `--password`: Password to decrypt data
- `-s` or `--silent`: Suppress console output
- `-o` or `--output`: Output decoded data file
- `-d` or `--debug`: Enable debug mode for error reporting

Both commands also have a `help` option that displays help for the command.

For more information, refer to the [GitHub repository](https://github.com/franzenzenhofer/qrpwd).

## Use Cases

Here are some possible use cases for qrpwd:

- Creating QR codes for events or promotions that require a password for access.
- Generating QR codes for Wi-Fi networks that require a password for access.
- Creating QR codes for password protected contact information that can be easily shared with others.
- Generating QR codes for URLs that require a password for access.
- Creating QR codes for loyalty programs that require a password for access.
- Generating QR codes for surveys or feedback forms that require a password for access.

