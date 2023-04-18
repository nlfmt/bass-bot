import BassBot from "@/bassbot";
import { ApplicationCommandOption, Client, CommandInteraction } from "discord.js";

export type Command = {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    options?: ApplicationCommandOption[];
    run: (i: CommandInteraction, bot: BassBot) => Promise<void>;
}