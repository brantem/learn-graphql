const { GraphQLServer } = require('graphql-yoga')
const { join } = require('path')

let users = [
  {
    name: 'a',
    age: 1
  },
  {
    name: 'b',
    age: 2
  }
]

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { name }) => users.find(user => user.name === name)
  },
  Mutation: {
    createUser: (_, { name, age }) => {
      const user = { name, age }

      users.push(user)

      return user
    }
  },
  User: {
    name: root => root.name,
    age: root => root.age
  }
}

const server = new GraphQLServer({
  typeDefs: join(__dirname, './schema.graphql'),
  resolvers
})

server.start(() => console.log('start'))
