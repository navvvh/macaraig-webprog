const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, default: '' },
  preview: { type: String },
  content: { type: [String], required: true },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);