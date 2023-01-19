const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { nonExistingId } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  console.log(request.body)
  Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => nonExistingId(error))
})

module.exports = blogsRouter