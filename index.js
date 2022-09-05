const express = require('express');
const fs = require('fs');
const app = express();
// const sql = require(`./models/db.js`);
const { sequelize, User } = require(`./models`);

app.use(express.json());

// async function main(){
//     await sequelize.sync();
// }

// main();
// constructor
const Post = function(post) {
    this.post = post.post;
    this.user_id = post.user_id;
  };

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello world!!!'});
});

const getAllPosts = (req, res) => {
    let query = "SELECT * FROM posts";

    // if (post) {
    //   query += ` WHERE title LIKE '%${post}%'`;
    // }
  
    // sql.query(query, (err, result) => {
    //   if (err) {
    //     console.log("error: ", err);
    //     return;
    //   }
  
    //     res.status(200).json({
    //     status: 'success',
    //     results: result.length,
    //     data: {
    //         posts: result
    //     }
    // });
    // });
  };

const getPost = (req, res) => {
    // const id = req.params['id'] * 1;
    // let query = `SELECT * FROM posts WHERE id = '%${id}%'`;

    // sql.query(query, (err, result) => {
    //     if (err || result.length === 0) {
    //       console.log("error: ", err);
    //       return res.status(404).json({
    //         status: "fail",
    //         message: "invalid ID"
    //     });
    //     }
    
    //     res.status(200).json({
    //     status: 'success',
    //     data: {
    //         posts: result
    //     }
    //   });
    // });
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
    // const id = req.params['id'] * 1;
    let query = `INSERT INTO posts values`;

    // sql.query(query, (err, result) => {
    //     if (err) {
    //       console.log("error: ", err);
    //       return res.status(404).json({
    //         status: "fail",
    //         message: "something went wrong..."
    //     });
    //     }
    
    //     res.status(200).json({
    //     status: 'success',
    //     data: {
    //         posts: result
    //     }
    //   });
    // });


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

const createUser = async(req, res) => {
    const { name, email, role } = req.body;

    try{
        const user = await User.create({ name, email, role });

        return res.json(user);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

const getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
  
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

app.route('/api/posts').get(getAllPosts).post(createPost);
app.route('/api/posts/:id').get(getPost).patch(updatePost).delete(deletePost);
app.route('/api/users').get(getUsers).post(createUser);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}`));
