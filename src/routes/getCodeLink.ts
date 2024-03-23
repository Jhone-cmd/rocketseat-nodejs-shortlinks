import { FastifyInstance } from "fastify";
import { sql } from "../lib/postgresql";
import { z } from "zod";
import { redis } from "../lib/redis";

export const getCodeLink = async (app:FastifyInstance) => {
    app.get("/:code", async (request, reply) => {
        const getCodeLinkSchema = z.object({
            code: z.string().min(3),
        });

    const { code } = getCodeLinkSchema.parse(request.params);

    const result = await sql/*sql*/`
        SELECT * from short_links WHERE code = ${code}`

    if (result.length === 0) {
        return reply.status(400).send({ message: "Link not found." })
    }

    const link = result[0];

    await redis.zIncrBy("metrics", 1, link.code);
    
    return reply.redirect(301, link.original_url);
    
    });
}