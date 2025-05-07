const express = require('express');
const router = express.Router();

const posts = [
  {
    id: 1,
    title: 'First book',
    content: 'About studying'
  },
  {
    id: 2,
    title: 'Second book',
    content: 'About discipline'
  }
];

router.get('/', (req, res) => {
  res.status(200).json(posts);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).json('Could not find the post you wanted!');
  } 
  res.status(200).json(post);
});

router.post('/', (req, res) => {
  const id = posts.length + 1;
  const { title, content } = req.body;
  const post = {id, title, content};

  posts.push(post);
  res.status(201).json(post);
});

router.put('/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(post => post.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json('Could not find the post to update');
  }

  post.title = title;
  post.content = content;

  res.status(200).json(post);
});

router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(post => post.id === parseInt(req.params.id));

  if (postIndex !== -1) {
    const deletedPost = posts.splice(postIndex, 1);
    return res.status(200).json(deletedPost[0]);
  } else {
    return res.status(404).json('Could not find the post to delete');
  }
});

module.exports = router;