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


// I can omit posts after / since i am using/requiring it in restAPI.js.
router.get('/', (req, res) => {
  res.status(200).json(posts);
});

router.post('/', (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  }

  posts.push(post);
  res.status(201).json(post);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).send('Could not find the post you wanted!');
  } 
  res.status(200).json(post);
});

router.put('/:id', (req, res) => {
  const post = posts.find(post => post.id === parseInt(req.params.id));

  if (!post) {
    res.status(404).send('Could not find the post to update');
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.status(200).json(post);
});

router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(post => post.id === parseInt(req.params.id));

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(200).json(posts);
  } else {
    res.status(404).send('Could not find the post to delete');
  }
});

module.exports = router;