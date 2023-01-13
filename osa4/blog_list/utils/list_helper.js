const dummy = (blogs) => {
  let some_useless_variable = blogs
  return (1)
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((s, blog) => {
    return (s + blog.likes)
  }, 0)
  return (sum)
}

const favoriteBlog = (blogs) => {
  let fav = blogs.reduce((f, blog) => {
    return (f.likes > blog.likes ? f : blog)
  }, {})
  return (fav)
}

const mostBlogs = (blogs) => {
  let authors = blogs.reduce((a, blog) => {
    if (blog.author in a) {
      a[blog.author] += 1
    } else {
      a[blog.author] = 1
    }
    return (a)
  }, {})
  let fav = Object.keys(authors).reduce((f, author) => {
    return (authors[f] > authors[author] ? f : author)
  }, '')
  return ({author: fav, blogs: authors[fav]})
}

const mostLikes = (blogs) => {
  let authors = blogs.reduce((a, blog) => {
    if (blog.author in a) {
      a[blog.author] += blog.likes
    } else {
      a[blog.author] = blog.likes
    }
    return (a)
  }, {})
  let fav = Object.keys(authors).reduce((f, author) => {
    return (authors[f] > authors[author] ? f : author)
  }, '')
  return ({author: fav, likes: authors[fav]})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}