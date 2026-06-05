const Article = require('../models/Article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, title, image, preview, content, status } = req.body;
    const existing = await Article.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Slug already exists' });

    const article = new Article({ name, title, image, preview, content, status });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getArticles, createArticle, updateArticle };