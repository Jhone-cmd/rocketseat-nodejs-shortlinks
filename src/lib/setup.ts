import { sql } from "./postgresql";

export const setup = async () => {
    await sql/*sql*/`
        CREATE TABLE IF NOT EXISTS short_links (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            code TEXT UNIQUE,
            original_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )        
    `
    await sql.end();
    console.log("Setup feito com sucesso.");
}

setup();