import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, login, likeBlog }) => {
  const [viewAll, setViewAll] = useState(false)

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
      <div style={blogStyle} className="blog">
        {t} -written by- {a}<button onClick={switchView} className={'hide-button'}>hide</button><br></br>
        {u}<br></br>
        likes {!blog.likes ? 0 : blog.likes}<button onClick={likeBlog} className={'like-button'}>like</button><br></br>
        {user.username}<br></br>
        {user.username === login ? <button onClick={deleteBlog}>remove</button> : <></>}
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className="blog">
        {`${t} -written by- ${a}`}
        <button onClick={switchView} className={'view-button'}>view</button>
      </div>
    )
  }
}

export default Blog