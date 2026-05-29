Sure — below is a concise step-by-step tutorial that shows three common ways to load JSON in JavaScript (local file using a simple static server, fetch from a URL, and loading a local JSON file in Node.js) with runnable code and expected output.

1) Browser: Serve a local JSON file via a simple static server (recommended for local testing)

Files:
- index.html
- script.js
- data.json

data.json
```
{
  "name": "Alice",
  "age": 30,
  "skills": ["JavaScript", "HTML", "CSS"]
}
```

index.html
```
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Load JSON</title></head>
<body>
  <h1 id="title">Loading...</h1>
  <pre id="output"></pre>
  <script src="script.js"></script>
</body>
</html>
```

script.js
```javascript
// Fetch the JSON file and display parsed output
fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
    return response.json();
  })
  .then(data => {
    document.getElementById('title').textContent = data.name + ' — ' + data.age + ' years';
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    console.log('Parsed JSON:', data);
  })
  .catch(err => {
    document.getElementById('title').textContent = 'Error';
    document.getElementById('output').textContent = err.message;
    console.error(err);
  });
```

Run:
- Start a static server in the folder (e.g., Python: `python -m http.server 8000`)
- Open http://localhost:8000

Expected page output:
- Heading: "Alice — 30 years"
- Preformatted block:
```
{
  "name": "Alice",
  "age": 30,
  "skills": [
    "JavaScript",
    "HTML",
    "CSS"
  ]
}
```
Console: Parsed JSON: {name: "Alice", age: 30, skills: Array(3)}

2) Browser: Fetch JSON from a remote URL (e.g., public API)

script.js
```javascript
const url = 'https://jsonplaceholder.typicode.com/users/1';
fetch(url)
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(user => {
    console.log('User:', user);
    document.body.insertAdjacentHTML('beforeend',
      `<pre>${JSON.stringify(user, null, 2)}</pre>`);
  })
  .catch(e => console.error('Fetch error:', e));
```

Expected console output (abbreviated):
User: { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: {...}, ... }

3) Node.js: Read a local JSON file

Option A — require (CommonJS, synchronous)
app.js
```javascript
const data = require('./data.json');
console.log('Loaded with require:', data);
```

Run:
`node app.js`

Output:
Loaded with require: { name: 'Alice', age: 30, skills: [ 'JavaScript', 'HTML', 'CSS' ] }

Option B — fs.readFile (async)
app-async.js
```javascript
const fs = require('fs').promises;
async function main(){
  try{
    const text = await fs.readFile('./data.json', 'utf8');
    const obj = JSON.parse(text);
    console.log('Parsed JSON:', obj);
  }catch(e){
    console.error('Error:', e);
  }
}
main();
```

Output:
Parsed JSON: { name: 'Alice', age: 30, skills: [ 'JavaScript', 'HTML', 'CSS' ] }

Notes and quick tips:
- In browsers you must serve files via HTTP/HTTPS (fetch won’t read file:// for local pages).
- Use response.json() to parse fetch responses.
- Wrap JSON.parse in try/catch when parsing raw text.
- For modern code prefer async/await:
```javascript
async function load(){
  const res = await fetch('data.json');
  const data = await res.json();
  console.log(data);
}
load();
```

If you want, I can:
- Provide a ready-to-run zip of these files,
- Convert examples to TypeScript,
- Show error-handling patterns or validation for larger JSON. Which would you like?