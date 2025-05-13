import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res)=>{
 res.render('index.ejs');
})

app.post('/generate', async(req, res) => {
   const url = req.body.url;
   const qr_img = qr.image(url, { type: 'png' });
   qr_img.pipe(fs.createWriteStream('public/assets/qr.png'));
   let qr_path = '/assets/qr.png';
   res.render('index.ejs', {qrCode: qr_path});
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
