const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  await blog.save()
  response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const idToDel = request.params.id
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