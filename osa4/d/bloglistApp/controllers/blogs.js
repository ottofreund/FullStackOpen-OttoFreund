const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  //get user from token
  const token = request.token
  if (!token) {
    return response.status(401).json({error: "no token provided"})
  }

  const blog = new Blog({...request.body, user: request.user.id})
  
  const saved = await blog.save()
  //save to User-document blogs array as well
  const userDoc = await User.findOne({username: request.user.username})
  userDoc.blogs = userDoc.blogs.concat(saved._id)
  await userDoc.save()
  
  response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const idToDel = request.params.id
  const token = request.token
  if (!token) {
    return response.status(401).json({error: "no token provided"})
  }
  
  const blogDoc = await Blog.findOne({_id: idToDel})
  
  if (blogDoc.user.toString() !== request.user.id) {
    //not authorized to delete other user's blog
    return response.status(401).json({error: "not authorized to delete other user's blog"})
  }
  await Blog.deleteOne({_id: idToDel})
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body
  const id = request.params.id
  await Blog.updateOne({_id: id}, newBlog)
  response.status(204).end()
})

module.exports = blogsRouter