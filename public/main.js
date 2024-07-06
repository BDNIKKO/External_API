document.getElementById('translateForm').addEventListener('submit', async (e) => {
   e.preventDefault();
   const text = document.getElementById('text').value;
   const resultDiv = document.getElementById('result');

   try {
       const response = await fetch('http://localhost:3000/api/translate', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           },
           body: new URLSearchParams({
               'text': text
           })
       });

       const data = await response.json();

       if (response.ok) {
           const detection = data.data.detections[0][0];
           const languageMap = {
               "af": "Afrikaans",
               "ar": "Arabic",
               "bn": "Bengali",
               "bg": "Bulgarian",
               "ca": "Catalan",
               "zh": "Chinese",
               "hr": "Croatian",
               "cs": "Czech",
               "da": "Danish",
               "nl": "Dutch",
               "en": "English",
               "et": "Estonian",
               "fi": "Finnish",
               "fr": "French",
               "de": "German",
               "el": "Greek",
               "gu": "Gujarati",
               "he": "Hebrew",
               "hi": "Hindi",
               "hu": "Hungarian",
               "is": "Icelandic",
               "id": "Indonesian",
               "it": "Italian",
               "ja": "Japanese",
               "kn": "Kannada",
               "ko": "Korean",
               "lv": "Latvian",
               "lt": "Lithuanian",
               "ms": "Malay",
               "ml": "Malayalam",
               "mr": "Marathi",
               "ne": "Nepali",
               "no": "Norwegian",
               "fa": "Persian",
               "pl": "Polish",
               "pt": "Portuguese",
               "pa": "Punjabi",
               "ro": "Romanian",
               "ru": "Russian",
               "sr": "Serbian",
               "sk": "Slovak",
               "sl": "Slovenian",
               "es": "Spanish",
               "sw": "Swahili",
               "sv": "Swedish",
               "ta": "Tamil",
               "te": "Telugu",
               "th": "Thai",
               "tr": "Turkish",
               "uk": "Ukrainian",
               "ur": "Urdu",
               "vi": "Vietnamese",
               "cy": "Welsh",
           };

           const detectedLanguage = languageMap[detection.language] || detection.language;

           resultDiv.innerHTML = `
               <h2 class="centered">Language Detection Result</h2>
               <hr class="styled-hr">
               <div class="language-output centered">
                   <p>Language: ${detectedLanguage}</p>
               </div>
           `;
       } else {
           resultDiv.innerHTML = `<p>${data.error}</p>`;
       }
   } catch (error) {
       resultDiv.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
   }
});
