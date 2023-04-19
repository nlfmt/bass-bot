import { ApplicationCommandOptionType } from "discord.js";
import { createCommand } from "@/util/register";

export default createCommand({
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    options: [
        {
            name: 'command',
            type: ApplicationCommandOptionType.String,
            description: 'The command you want info on.',
        }
    ],
    async run(i, bot) {
        i.channel?.send('Pong.');
    }
})
