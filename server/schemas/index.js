// In order to successfully set up a GraphQL API, two things must be defined in unison:
// type definitions and resolvers. Type definitions encompass literally every piece of data
// the client can be expected to work with through a query or a mutation. In the type definitions
// you are defining not only the endpoint, but also the exact data and parameters tied to that data
// Resolvers are the functions we attach/connect to each query or mutation type definition that
// perform CRUD actions. The type defs and resolvers combined form what we call the 'schema'
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };