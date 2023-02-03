import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('creating a new blog happens with the entered props', async () => {
    const title = 'test title'
    const author = 'test author'
    const url = 'test url'
    const mockCreateBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={mockCreateBlog} />)
    const titleInput = container.querySelector('#title-input')
    await userEvent.type(titleInput, title)
    const authorInput = container.querySelector('#author-input')
    await userEvent.type(authorInput, author)
    const urlInput = container.querySelector('#url-input')
    await userEvent.type(urlInput, url)
    const createButton = screen.getByText('create')
    await userEvent.click(createButton)
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe(title)
    expect(mockCreateBlog.mock.calls[0][0].author).toBe(author)
    expect(mockCreateBlog.mock.calls[0][0].url).toBe(url)
  })
})
