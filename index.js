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
        authors() {
            return db.authors
        },
        reviews() {
            return db.reviews
        },
        // The next resolver will be to query for a specific review by its id. It can take 3 arguments: parent, args and context (for the moment we will ignore the first and last)
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id) // This returns a specific review by its id.
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