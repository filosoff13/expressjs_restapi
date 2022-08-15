const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.get('/api/courses', (req, res) => {

})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listerning on port 3000'));

