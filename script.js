import inquirer from "inquirer";
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';


inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Paste your URL here: "

    }
  ])
  .then((answers) => {
    
    var url = answers.url;
    var qr_svg = qr.image(url);
    var qrFileName = 'Your_qr.png';
    var qrconvert = qr_svg.pipe(fs.createWriteStream('Your_qr.png'));

    qrconvert.on('finish', () => {
      var pathofqr = path.resolve(qrFileName);
      console.log(`QR code has been saved successfully to: ${pathofqr}`)
    })

    fs.writeFile('qr_link.txt', url, function (err) {
      if (err) return console.log(err)
      console.log('Text file is written')
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.log('Something went wrong. Please try again.');
    }
  });