import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"; // types
import db from "./_db.js";

// Let's create resolver functions (they determine how we respond to queries):
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        // The next resolver will be to query for a specific review by its id. It can take 3 arguments: parent, args and context (for the moment we will ignore the first and last)
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id) // This returns a specific review by its id.
        }
    },
    // Let's create a resolver for Game, so we can get the reviews of a specific game:
    Game: {
        reviews(parent) { // The parent parameter is a reference of the value return by the parent resolver (game)
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    // And now the same for the authors, let's get all the reviews by a specific author:
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        // Find the author of a specific review:
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        },
        // Find the game of a specific review:
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id !== args.id)

            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString() // Create a new random id.
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((g) => {
                if (g.id === args.id) {
                    return {...g, ...args.edits} // Note how if we update the title (for example), that new title from "...args.edits" will overwrite the one from "...g".
                }

                return g
            })

            return db.games.find((g) => g.id === args.id)
        }
    }
}

// Server setup
const server = new ApolloServer({
    // typeDefs define our data types and relations:
    typeDefs,
    // Resolver functions:
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log("Server ready at port 4000")