import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { config_PORT } from "../config";

export const initGraphQLServer = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
            debug: true,
      });
      const { url } = await server.listen({ port: config_PORT });
      console.log(`🚀 Apollo server ready at ${url}`);
    } catch (e) {
      throw e;
    }
  };