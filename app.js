// Import the Express framework
const express = require('express');

// Import the CORS middleware
const cors = require('cors');

// Import the HTTPS module for making HTTPS requests
const https = require('https');

// Create an instance of an Express application
const app = express();

// Define the port on which the server will listen
const port = 3000;

// Define the CORS options
const corsOptions = {
   origin: '*', // Allow all origins
   credentials: true, // Allow credentials
   optionSuccessStatus: 200, // Success status code for preflight requests
};

// Apply the CORS middleware with the specified options
app.use(cors(corsOptions));

// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json());

// Parse incoming URL-encoded requests and put the parsed data in req.body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the root URL
app.get('/', (req, res) => {
   // Send the index.html file in response to a GET request to the root URL
   res.sendFile(__dirname + '/public/index.html');
});

// Define a route for handling translation requests
app.post('/api/translate', (req, res) => {
   // Extract the text to be translated from the request body
   const text = req.body.text;
   
   // Define the options for the HTTPS request to the translation API
   const options = {
      method: 'POST', // HTTP method
      hostname: 'google-translate1.p.rapidapi.com', // API hostname
      port: null, // Use default port
      path: '/language/translate/v2/detect', // API endpoint for language detection
      headers: { // Headers for the request
         'x-rapidapi-key': '6c3032f526msh356d2ed02e7a887p1f4500jsn3b8b268ee343', // API key for authentication
         'x-rapidapi-host': 'google-translate1.p.rapidapi.com', // API host
         'Content-Type': 'application/x-www-form-urlencoded', // Content type of the request
         'Accept-Encoding': 'application/gzip' // Accept compressed responses
      }
   };

   // Encode the text to be sent in the body of the request
   const postData = `q=${encodeURIComponent(text)}`;

   // Make the HTTPS request to the translation API
   const reqApi = https.request(options, function (response) {
      // Array to hold the chunks of data received from the API
      const chunks = [];

      // Event listener for when a chunk of data is received
      response.on('data', function (chunk) {
         chunks.push(chunk); // Add the chunk to the array
      });

      // Event listener for when all chunks of data have been received
      response.on('end', function () {
         // Combine the chunks into a single Buffer and convert it to a string
         const body = Buffer.concat(chunks);
         // Send the response body to the client
         res.send(body.toString());
      });
   });

   // Event listener for errors in the HTTPS request
   reqApi.on('error', function (e) {
      // Send a 500 status code and an error message to the client
      res.status(500).json({ error: 'Failed to fetch data' });
   });

   // Write the encoded text data to the request body
   reqApi.write(postData);

   // End the request
   reqApi.end();
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
   // Log a message to the console indicating that the server is running
   console.log(`Server is running on http://localhost:${port}`);
});
