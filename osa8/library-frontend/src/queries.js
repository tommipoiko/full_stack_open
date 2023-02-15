import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query Query {
    allBooks {
      author
      genres
      published
      title
    }
  }
`

export const AUTHOR_COUNT = gql`
  query Query {
    authorCount
  }
`
export const BOOK_COUNT = gql`
  query Query {
    bookCount
  }
`
