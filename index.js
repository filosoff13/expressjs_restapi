const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello world!!!'});
});

const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`));

app.get('/api/posts', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts: posts
        }
    });
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}`));

