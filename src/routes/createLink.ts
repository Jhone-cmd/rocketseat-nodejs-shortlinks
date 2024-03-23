import { FastifyInstance } from "fastify";
import { z } from "zod";
import { sql } from "../lib/postgresql";
import { PostgresError } from "postgres";

export const createLink = async (app: FastifyInstance) =>  {
    app.post('/api/links',  async (request, reply) => {
        const createLinkSchema = z.object({
            code: z.string().min(3),
            url: z.string().url()
        });

        const { code, url } = createLinkSchema.parse(request.body);

        try {

            const result = await sql/*sql*/`
            INSERT INTO short_links(code, original_url)
            VALUES (${code}, ${url}) RETURNING id;
            `
            const link = result[0];

            return reply.status(201).send({ shortLinkId: link.id });

        } catch (error) {
            if (error instanceof PostgresError) {
                if (error.code === "23505") {
                    return reply.status(400).send({ message: "Duplicated code!" });
                }
            }
            console.error(error);

            return reply.status(500).send({ message: "Internal Error" });
        }           
    });
}