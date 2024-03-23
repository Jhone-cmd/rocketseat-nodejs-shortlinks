import { FastifyInstance } from "fastify";
import { redis } from "../lib/redis";

export const getMetricsLink = async (app:FastifyInstance) => {
    app.get("/api/links/metrics", async() => {

    const result = await redis.zRangeByScoreWithScores("metrics", 0, 50);

    const metrics = result
    .sort((a, b) => b.score - a.score)
    .map(item => {
        return {
            code: item.value,
            clicks: item.score
        }
    });
      
    return metrics;

    });
}