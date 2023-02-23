const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
    me: (root, args, context) => {
      return context.currentUser
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let a = await Author.findOne({ name: args.author })
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
      a = await Author.findOne({ name: args.author })
      const book = new Book({...args, author: a.id})
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
      let ret = await Book.find().find().populate('author')
      ret = ret.filter(b => b.title === args.title)[0]
      pubsub.publish('ADDED_BOOK', { bookAdded: ret })
      return ret
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const a = await Author.findOne({ name: args.name })
      if (a) {
        a.born = args.setBornTo
        return (a.save())
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const ret = { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      // console.log(ret)
      // Use above if Apollo Server token return vittuilee

      return ret
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('ADDED_BOOK')
    }
  }
}

module.exports = resolvers