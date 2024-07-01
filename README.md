# Node.js TCP File Transfer

A simple Node.js application to demonstrate TCP-based file upload and download. This project showcases the use of TCP sockets, streams, and buffers to efficiently transfer files between a client and a server.

## Features

- **TCP Connection**: Establishes a TCP connection between the client and server.
- **File Upload**: Allows clients to upload files to the server.
- **Progress Tracking**: Displays the upload progress as a percentage on the client side.
- **Stream Handling**: Efficiently handles file read and write operations using streams to manage large files.

## Getting Started

### Prerequisites

- Node.js (v12 or later)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/nodejs-tcp-file-transfer.git
    cd nodejs-tcp-file-transfer
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Usage

1. Start the server:
    ```sh
    node server.js
    ```

2. In a separate terminal, run the client:
    ```sh
    node client.js
    ```

3. Follow the prompts in the client to enter the file path for upload.

