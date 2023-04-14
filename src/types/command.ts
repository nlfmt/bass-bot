import { ApplicationCommandOption, CommandInteraction } from "discord.js";

export type Command = {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    options?: ApplicationCommandOption[];
    run: (i: CommandInteraction) => Promise<void>;
}