const express = require('express');
// const fs = require('fs');
const app = express();
const { sequelize, User, Post, Comment } = require(`./models`);
const {authPage} = require('./middlewares/authServer');
const auth = require('express-rbac');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello world!!!'});
});

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' })

    return res.json(posts)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
};

const getPost = async (req, res) => {
  const uuid = req.params.id;

  try {
    const post = await Post.findOne({ where: { uuid } })

    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
};

const updatePost = async(req, res) => {
    const uuid = req.params.id;
    const { body } = req.body;

    try {
      const post = await Post.findOne({ where: { uuid } });
  
      post.body = body;
  
      await post.save();
  
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
};

const deletePost = async(req, res) => {
  const uuid = req.params.id;
    
  try {
    const post = await Post.findOne({ where: { uuid } });

    await post.destroy();

    return res.json({ message: 'Post deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const createPost = async(req, res) => {
  const { userUuid, body } = req.body;
  console.log(userUuid);
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
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
        // include: 'posts',
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

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: 'post' })

    return res.json(comments)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
};

const createComment = async(req, res) => {
  const { postUuid, body } = req.body;

  try {
    const post = await Post.findOne({ where: { uuid: postUuid } });

    const comment = await Comment.create({ body, postId: post.id });

    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getComment = async (req, res) => {
  const uuid = req.params.id;

  try {
    const comment = await Comment.findOne({ where: { uuid } })

    return res.json(comment)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
};

const updateComment = async(req, res) => {
    const uuid = req.params.id;
    const { body } = req.body;

    try {
      const comment = await Comment.findOne({ where: { uuid } });
  
      comment.body = body;
  
      await comment.save();
  
      return res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
};

const deleteComment = async(req, res) => {
  const uuid = req.params.id;
    
  try {
    const comment = await Comment.findOne({ where: { uuid } });

    await comment.destroy();

    return res.json({ message: 'Post deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

app.route('/api/posts').get(getAllPosts, authPage(["Editor", "Admin"])).post(createPost, authPage(["Editor", "Admin"]));
// app.route('/api/posts').get(getAllPosts).post(createPost);
app.route('/api/posts/:id').get(getPost).patch(updatePost).delete(deletePost);
app.route('/api/users').get(getUsers).post(createUser);
app.route('/api/users/:uuid').get(getUser).patch(updateUser).delete(deleteUser);
app.route('/api/comments').get(getComments).post(createComment);
app.route('/api/comments/:uuid').get(getComment).patch(updateComment).delete(deleteComment);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}`));
