const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

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
});

app.get('/api/posts/:id', (req, res) => {
    const id = req.params['id'] * 1;
    const post = posts.find(el => el.id === id);

    if (!post) {
        return res.status(404).json({
            status: "fail",
            message: "invalid ID"
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
});

app.patch('/api/posts/:id', (req, res) => {
    // const post = posts.find(el => el.id === id);

    if (req.params.id * 1 > posts.length) {
        return res.status(404).json({
            status: "fail",
            message: "invalid ID"
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            post: "<upd here .."
        }
    });
});

app.delete('/api/posts/:id', (req, res) => {
    if (req.params.id * 1 > posts.length) {
        return res.status(404).json({
            status: "fail",
            message: "invalid ID"
        });
    }
    
    res.status(204).json({
        status: 'success',
        data: null
    });
});

app.post('/api/posts', (req, res) => {
    // console.log(req.body);

    const newId = parseInt(posts[posts.length - 1].id) + 1;
    const newPost = Object.assign({id: newId}, req.body);

    posts.push(newPost);
    fs.writeFile(`${__dirname}/data/posts.json`, JSON.stringify(posts), err => {
        res.status(201).json({
            status: "success",
            data: {
                post: newPost
            }
        })
    });
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}`));

