const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Kamasutra',
    author: 'Tommi & Ade',
    url: 'www.url.com',
    likes: 69
  },
  {
    title: 'Kamasutra 2',
    author: 'Tommi & Ade',
    url: 'www.url.com',
    likes: 420
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}