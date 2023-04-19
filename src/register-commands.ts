import { ApplicationCommandOption, REST, Routes } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import { Command } from "./types/command";

import dotenv from "dotenv";
import logger from "./util/logger";

(async () => {
    dotenv.config();
    const rest = new REST().setToken(process.env.TOKEN!);

    const commandFiles = await readdir(join(__dirname, "commands"));
    logger.info("Loading commands...");
    const commands = new Array<{ name: string, description: string, options?: ApplicationCommandOption[] }>();

    for (const file of commandFiles) {
        const command: Command = require(`./commands/${file}`)?.default;
        if (!command || !command.name || !command.description) {
            logger.warn(`❌ ${file} is not a valid command.`);
            continue;
        }
        logger.info(`✔ ${command.name}`);
        commands.push({
            name: command.name,
            description: command.description,
            options: command.options
        });
    };

    for (const cmd of commands) {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!), 
            { body: commands }
        );
    }
})();