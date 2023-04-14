import BassBot from "./bassbot";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const bot = new BassBot({
    intents: 32767,
});

bot.init();