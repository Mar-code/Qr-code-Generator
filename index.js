import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import bodyParser from 'body-parser';
import env from 'dotenv';

env.config();
const PORT = process.env.PORT|| 3000;
const app = express();
let qrCode = '';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res)=>{
 res.render('index.ejs');
})

app.post('/generate', async(req, res) => {
   const url = req.body.url;
   const qr_img = qr.imageSync(url, { type: 'png' });
    qrCode = qr_img;
   res.render('index.ejs', {qrCode: qr_img.toString('base64')});
})

app.get('/download', (req, res) => {
  
    const filePath = `qr_code.png`;
    fs.writeFileSync(filePath, qrCode, 'binary');
    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
        }
        fs.unlinkSync(filePath); // Delete the file after download
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
