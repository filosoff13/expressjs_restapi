const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello world!!!'});
});

const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`));

const getAllPosts = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts: posts
        }
    });
};
const getPost = (req, res) => {
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
};

const updatePost = (req, res) => {
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
};

const deletePost = (req, res) => {
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
};
const createPost = (req, res) => {
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
};

app.route('/api/posts').get(getAllPosts).post(createPost);
app.route('/api/posts/:id').get(getPost).patch(updatePost).delete(deletePost);

// app.get('/api/posts', getAllPosts);
// app.get('/api/posts/:id', getPost);
// app.patch('/api/posts/:id', updatePost);
// app.delete('/api/posts/:id', deletePost);
// app.post('/api/posts', createPost);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}`));
