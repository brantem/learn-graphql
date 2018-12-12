const { GraphQLServer } = require('graphql-yoga')
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools')
const { readFileSync } = require('fs')
const { join } = require('path')

const knex = require('knex')(require('../knexfile'))

const userSchema = makeExecutableSchema({
  typeDefs: readFileSync(join(__dirname, './schemas/user.graphql'), 'utf8'),
  resolvers: require('./resolvers/userResolver')(knex)
})

const bookSchema = makeExecutableSchema({
  typeDefs: readFileSync(join(__dirname, './schemas/book.graphql'), 'utf8'),
  resolvers: require('./resolvers/bookResolver')(knex)
})

const linkDefs = `
extend type User {
  books: [Book!]
}

extend type Book {
  author: User
}
`

const server = new GraphQLServer({
  schema: mergeSchemas({
    schemas: [userSchema, bookSchema, linkDefs],
    resolvers: require('./resolvers/customResolver')(knex)
  })
})

server.start(() => console.log('start'))
