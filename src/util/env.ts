import z from "zod";
import dotenv from "dotenv";
import { toErrList } from "./errors";
import logger from "./logger";

dotenv.config({ path: "./.env" });

const envSchema = z.object({
    TOKEN: z.string().nonempty(),
    CLIENT_ID: z.string().nonempty(),

    SPOTIFY_ID: z.string().nonempty(),
    SPOTIFY_SECRET: z.string().nonempty(),
});

const res = envSchema.safeParse(process.env);
if (!res.success) {
    logger.error("env", "❌ Invalid environment variables:");
    logger.error("env", toErrList(res.error));
    process.exit(1);
}

export default res.data;