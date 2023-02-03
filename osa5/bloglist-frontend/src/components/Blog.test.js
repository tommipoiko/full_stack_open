import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
jest.mock('../services/blogs', () => ({ update: jest.fn() }))
jest.mock('../services/blogs', () => ({ remove: jest.fn() }))

describe('<Blog />', () => {
  const blog = {
    'title': 'Kamasutra 3',
    'author': 'Tommi & Ade',
    'url': 'www.url.com',
    'likes': 11,
    'user': {
      'username': 'root',
      'name': 'Superuser',
      'id': '63cabff4c497d753384a6b45'
    },
    'id': '63cac20a4c46516e72daf511'
  }

  const blogs = [
    {
      'title': 'Kamasutra 4',
      'author': 'Tommi & Ade',
      'url': 'www.url.com',
      'likes': 9001,
      'user': {
        'username': 'root',
        'name': 'Superuser',
        'id': '63cabff4c497d753384a6b45'
      },
      'id': '63cad3c5f8e2a9dc10c906fc'
    },
    {
      'title': 'Kamasutra 5',
      'author': 'Tommi & Ade',
      'url': 'www.url.com',
      'likes': 90001,
      'user': {
        'username': 'root',
        'name': 'Superuser',
        'id': '63cabff4c497d753384a6b45'
      },
      'id': '63cad3ed85a3d6fa5d153416'
    }
  ]

  const mockSetBlogs = jest.fn()
  const mockLikeBlog = jest.fn()

  // eslint-disable-next-line no-unused-vars
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} blogs={blogs} setBlogs={mockSetBlogs} login={'root'} likeBlog={mockLikeBlog} key={blog.id}/>
    ).container
  })

  test('by default the rendered blog contains only the author and the books name', () => {
    const b = screen.getByText('Kamasutra 3 -written by- Tommi & Ade')
    expect(b).toBeDefined()
    const bad_b = screen.queryByText('www.url.com')
    expect(bad_b).toBeNull()
  })

  test('pressing the "view" button shows all of the blogs information', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const b = screen.getByText('Kamasutra 3 -written by- Tommi & Ade', { exact: false })
    expect(b).toBeDefined()
    const b2 = screen.getByText('www.url.com', { exact: false })
    expect(b2).toBeDefined()
    const b3 = screen.getByText('likes 11', { exact: false })
    expect(b3).toBeDefined()
    const b4 = screen.getByText('root', { exact: false })
    expect(b4).toBeDefined()
  })

  test('pressing like twice should like the blog twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.click(like)
    expect(mockLikeBlog.mock.calls).toHaveLength(1)
    await user.click(like)
    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })
})
