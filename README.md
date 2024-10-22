
# QR Code Generator

This project is a simple **Node.js** application that generates a QR code from a user-provided URL and saves it as an image. Additionally, the project saves the URL and the path of the generated QR code image to a text file.

## Project Overview

The application uses three main packages:

- **Inquirer**: To prompt the user for input (the URL).
- **qr-image**: To generate a QR code from the URL.
- **fs (File System)**: To save both the QR code image and the URL into separate files.

### JavaScript Code Explanation

Here's a breakdown of how the code works:

```javascript
import inquirer from "inquirer";
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';
```

- **inquirer**: Used to prompt the user for the URL input.
- **qr-image**: This package generates QR codes from strings.
- **fs**: This is Node.js's native file system module, used to write the QR code image and the URL to a file.
- **path**: A module for working with file paths (used here to resolve the full path of the generated QR code image).

### The Main Logic

The main logic for the QR code generation is wrapped inside the `.then()` function, which gets executed after the user inputs the URL:

```javascript
inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Paste your URL here: "
    }
  ])
  .then((answers) => {
    var url = answers.url;  // Store the URL input from the user
    var qr_svg = qr.image(url);  // Generate the QR code image from the URL
    var qrFileName = 'Your_qr.png';  // Define the output file name for the QR code image
    var qrconvert = qr_svg.pipe(fs.createWriteStream(qrFileName));  // Save the QR code image to the file

    qrconvert.on('finish', () => {
      var pathofqr = path.resolve(qrFileName);  // Get the absolute path of the saved QR code image
      console.log(`QR code has been saved successfully to: ${pathofqr}`);  // Output the file path in the terminal
    });

    // Save the URL to a text file
    fs.writeFile('qr_link.txt', url, function (err) {
      if (err) return console.log(err);  // Handle errors
      console.log('Text file is written');  // Confirm the text file was written
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.log('Something went wrong. Please try again.');
    }
  });
```

### Code Breakdown:

1. **Prompting the User for Input**:
   ```javascript
   inquirer.prompt([
     {
       type: "input",
       name: "url",
       message: "Paste your URL here: "
     }
   ])
   ```
   This prompts the user in the terminal to enter a URL. The input is stored in the `answers.url` variable.

2. **Generating the QR Code**:
   ```javascript
   var qr_svg = qr.image(url);
   ```
   Once the URL is captured, this line creates a QR code in an SVG format from the provided URL.

3. **Saving the QR Code Image**:
   ```javascript
   var qrconvert = qr_svg.pipe(fs.createWriteStream(qrFileName));
   ```
   The QR code image is then piped into a write stream, which writes the file as `Your_qr.png`.

4. **Getting the Full Path of the Image**:
   ```javascript
   var pathofqr = path.resolve(qrFileName);
   console.log(`QR code has been saved successfully to: ${pathofqr}`);
   ```
   After the QR code image is successfully written, the full file path is determined using `path.resolve()` and printed in the terminal.

5. **Saving the URL to a Text File**:
   ```javascript
   fs.writeFile('qr_link.txt', url, function (err) {
     if (err) return console.log(err);
     console.log('Text file is written');
   });
   ```
   Finally, the provided URL is saved in a text file (`qr_link.txt`), which acts as a record of what URL the QR code represents.

### Files Generated:
- **Your_qr.png**: This is the generated QR code image file.
- **qr_link.txt**: This text file stores the original URL provided by the user.

### How to Use:

1. Run the script using Node.js:
   ```bash
   node script.js
   ```
2. Paste your URL into the prompt when asked.

3. The QR code will be saved to `Your_qr.png` in the same directory, and the URL will be saved in `qr_link.txt`.

