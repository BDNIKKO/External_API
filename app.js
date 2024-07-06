const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const port = 3000;

const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/translate', (req, res) => {
   const text = req.body.text;
   
   const options = {
      method: 'POST',
      hostname: 'google-translate1.p.rapidapi.com',
      port: null,
      path: '/language/translate/v2/detect',
      headers: {
         'x-rapidapi-key': '6c3032f526msh356d2ed02e7a887p1f4500jsn3b8b268ee343', // Use your RapidAPI key
         'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
         'Content-Type': 'application/x-www-form-urlencoded',
         'Accept-Encoding': 'application/gzip'
      }
   };

   const postData = `q=${encodeURIComponent(text)}`;

   const reqApi = https.request(options, function (response) {
      const chunks = [];

      response.on('data', function (chunk) {
         chunks.push(chunk);
      });

      response.on('end', function () {
         const body = Buffer.concat(chunks);
         res.send(body.toString());
      });
   });

   reqApi.on('error', function (e) {
      res.status(500).json({ error: 'Failed to fetch data' });
   });

   reqApi.write(postData);
   reqApi.end();
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
