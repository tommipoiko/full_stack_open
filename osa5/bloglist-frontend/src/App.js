import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import SuccessMsg from './components/SuccessMsg'
import ErrorMsg from './components/ErrorMsg'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMsg('wrong username or password')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const addBlog = ({ title, author, url, setTitle, setAuthor, setUrl }) => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTitle('')
        setAuthor('')
        setUrl('')
        blogFormRef.current.toggleVisibility()
        setSuccessMsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      })
  }

  const likeBlog = id => {
    const blog = blogs.find(b => b.id === id)
    let newBlog = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blog.likes += 1
    setBlogs(blogs.filter(b => b.id !== id).concat(blog))
    blogService.update(blog.id, newBlog)
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMsg message={errorMsg}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id={'username'}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id={'password'}
            />
          </div>
          <button type="submit" id={'login-button'}>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessMsg message={successMsg}/>
      <div>{user.name} has logged in</div>
      <br></br>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <br></br>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
          return <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} login={user.username} likeBlog={() => likeBlog(blog.id)} key={blog.id}/>
        })
      }
    </div>
  )
}

export default App