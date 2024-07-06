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
         resultDiv.innerHTML = `
            <h2>Language Detection Result</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
         `;
      } else {
         resultDiv.innerHTML = `<p>${data.error}</p>`;
      }
   } catch (error) {
      resultDiv.innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
   }
});
