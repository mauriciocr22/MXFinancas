import fastify from "fastify";
import cors from "@fastify/cors";
import { categoryRoutes } from "./src/routes/categoryRoutes";

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(categoryRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at port ${address}`);
});
