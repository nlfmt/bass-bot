import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Command } from "../types/command";

const cmd: Command = {
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
    async run(i: CommandInteraction) {
        i.channel?.send('Pong.');
    }
}

export default cmd;