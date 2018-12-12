module.exports = knex => ({
  Query: {
    books: async () => await knex('books').select(),
    book: async (_, { id }) => {
      const [book] = await knex('books').where({ id })

      return book
    }
  },
  Mutation: {
    createBook: async (_, { title, user_id }) => {
      const bookId = await knex('books').insert({ title, author: user_id })

      return { id: bookId, title }
    }
  }
})
