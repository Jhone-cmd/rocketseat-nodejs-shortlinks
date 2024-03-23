import fastify from  "fastify";
import { createLink } from "./routes/createLink";
import { getAllLinks } from "./routes/getAllLinks";
import { getCodeLink } from "./routes/getCodeLink";
import { getMetricsLink } from "./routes/getMetricsLink";

const app = fastify();

app.register(createLink);
app.register(getAllLinks);
app.register(getCodeLink);
app.register(getMetricsLink);

app.listen({
    port: 3333
}).then(() => {
    console.log("Server is Running🚀")
})
