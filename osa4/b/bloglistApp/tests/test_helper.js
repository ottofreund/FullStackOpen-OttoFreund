const Blog = require('../models/Blog')

const initBlogs = [
  {
    "title": "How to keep your room cool",
    "author": "Jessica Hayes",
    "url": "https://fakeassurl.com",
    "likes": 150
  },
  {
    "title": "How to keep your room warm",
    "author": "Jessica Hayes",
    "url": "https://fakeassurl2.com",
    "likes": 50,
  }
]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs
}

module.exports = {initBlogs, getBlogs}