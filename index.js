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

const getPost = async (req, res) => {
    const { userUuid, body } = req.body;

    try {
      const user = await User.findOne({ where: { uuid: userUuid } });
  
      const post = await Post.create({ body, userId: user.id });
  
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
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

const getUser = async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
};
  
const deleteUser = async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const user = await User.findOne({ where: { uuid } });
  
      await user.destroy();
  
      return res.json({ message: 'User deleted!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
};
  
const updateUser = async (req, res) => {
    const uuid = req.params.uuid;
    const { name, email, role } = req.body;
    try {
      const user = await User.findOne({ where: { uuid } });
  
      user.name = name;
      user.email = email;
      user.role = role;
  
      await user.save();
  
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
};

app.route('/api/posts').get(getAllPosts).post(createPost);
app.route('/api/posts/:id').get(getPost).patch(updatePost).delete(deletePost);
app.route('/api/users').get(getUsers).post(createUser);
app.route('/api/users/:uuid').get(getUser).patch(updateUser).delete(deleteUser);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}`));
