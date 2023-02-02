import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs, login}) => {
  const [viewAll, setViewAll] = useState(false)
  const [likes, setLikes] = useState(!blog.likes ? 0 : blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let t = blog.title
  let u = blog.url
  let a = blog.author
  let user = blog.user

  const switchView = () => {
    setViewAll(!viewAll)
  }

  const likeBlog = () => {
    let newBlog = {
      user: user._id,
      likes: likes + 1,
      author: a,
      title: t,
      url: u
    }
    setLikes(likes + 1)
    blogService.update(blog.id, newBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${t} by ${a}?`)) {
      blogService
        .remove(blog.id)
        .then(
          setBlogs(blogs.filter(b => b.id !== blog.id))
        )
    }
  }

  if (viewAll) {
    return (
      <div style={blogStyle}>
        {t} -written by- {a}<button onClick={switchView}>hide</button><br></br>
        {u}<br></br>
        likes {likes}<button onClick={likeBlog}>like</button><br></br>
        {user.username}<br></br>
        {user.username === login ? <button onClick={deleteBlog}>remove</button> : <></>}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {`${t} -written by- ${a}`}
        <button onClick={switchView}>view</button>
      </div>
    )
  }
}

export default Blog