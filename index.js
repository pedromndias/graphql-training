import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"

// Server setup
const server = new ApolloServer({
    // Define our data types and relations:

    // Resolver functions that determine how we respond to queries:
    
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log("Server ready at port 4000")