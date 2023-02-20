const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let ret = await Book.find().find({}).populate('author')
      if (args.author) {
        ret = ret.filter(b => b.author === args.author)
      }
      if (args.genre) {
        ret = ret.filter(b => b.genres.includes(args.genre))
      }
      return (ret)
    },
    allAuthors: async () => {
      const result = await Author.find({})
      return (result)
    },
    me: () => {
      return "Moi"
    }
  },
  Author: {
    bookCount: async (root) => {
      let books = await Book.find().find({}).populate('author')
      books = books.filter(b => b.author.name === root.name)
      return (books.length)
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let a = await Author.find({ name: args.author })
      if (a === undefined || a.length === 0) {
        a = new Author({ name: args.author })
        try {
          await a.save()
        } catch (error) {
          throw new GraphQLError('Author name too short', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const book = new Book({...args, author: a })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Title name too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const a = await Author.findOne({ name: args.name })
      if (a) {
        a.born = args.setBornTo
        return (a.save())
      }
    },
    createUser: async (root, args) => {
      return "Moi"
    },
    login: async (root, args) => {
      return "Moi"
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})