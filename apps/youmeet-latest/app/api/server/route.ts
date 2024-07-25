import "@sentry/tracing";
import { createSchema, createYoga } from "graphql-yoga";
import resolvers from "@/resolvers";
import mongoose from "mongoose";
import { schema as typeDefs } from "@youmeet/gql/imports";

mongoose.connect(`${process.env.MONGODB_URI}`);

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/server",
  schema,
  graphiql: false,
  cors: {
    origin: [`${process.env.API_DOMAIN}`, `${process.env.PRO_DOMAIN}`],
    allowedHeaders: ["X-Custom-Header"],
    methods: ["POST", "OPTIONS", "GET"],
    credentials: true,
  },
  async context(context: any) {
    context.request.headers.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS"
    );
  },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};