module.exports = knex => ({
  Query: {
    users: async () => await knex('users').select(),
    user: async (_, { id }) => {
      const [user] = await knex('users').where({ id })

      return user
    }
  },
  Mutation: {
    createUser: async (_, { name, age }) => {
      const userId = await knex('users').insert({ name, age })

      return { id: userId, name, age }
    }
  }
})
