export const typeDefs = `#graphql
    type Game {
        id: ID! #note the "!" for required
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    #all GraphQL schema needs a Query type:
    type Query {
        reviews: [Review]
        review(id: ID!): Review #This is to query a single review by id.
        games: [Game]
        authors: [Author]
    }
`

// The 5 scalar types: int, float, string, boolean, ID(key for data objects)