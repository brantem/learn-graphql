module.exports = knex => ({
  User: {
    books: {
      fragment: '... on User {id}',
      resolve: async user => await knex('books').where({ author: user.id })
    }
  },
  Book: {
    author: {
      fragment: '... on Book {id}',
      resolve: async book => {
        const [author] = await knex('users').where({ id: book.author })

        return author
      }
    }
  }
})
