const express = require('express');
const router = express.Router();
const { getArticles, createArticle, updateArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.post('/', createArticle);
router.put('/:id', updateArticle);

module.exports = router;