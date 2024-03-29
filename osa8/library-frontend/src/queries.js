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
  query AllBooks {
    allBooks {
      author {
        name
      }
      genres
      published
      title
    }
  }
`

export const ALL_BOOKS_VARIABLES = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      genres
      published
      title
      author {
        name
      }
    }
  }
`

export const AUTHOR_COUNT = gql`
  query authorCount {
    authorCount
  }
`

export const BOOK_COUNT = gql`
  query bookCount {
    bookCount
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      favouriteGenre
    }
  }
`
