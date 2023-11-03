export const typeDefs = `#graphql
    type Game {
        id: ID! #note the "!" for required
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game! #relation between a review and a game
        author: Author! #relation between an author and a game
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    #all GraphQL schema needs a Query type:
    type Query {
        reviews: [Review]
        review(id: ID!): Review #This is to query a single review by id.
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    #Now let's determine how users can mutate the data:
    type Mutation {
        #To create a new game we need to pass all the properties as arguments (besides the id). In this case we will use an input called AddGameInput (created down bellow):
        addGame(game: AddGameInput): Game
        
        deleteGame(id: ID!): [Game] #When a user deletes a game, we return the updated array of games.

        updateGame(id: ID!, edits: EditGameInput!): Game
    }
    #Let's create a collection of fields that can be used as a single argument:
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    input EditGameInput {
        title: String
        platform: [String!]
    }
`

// The 5 scalar types: int, float, string, boolean, ID(key for data objects)