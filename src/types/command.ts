import BassBot from "@/bassbot";
import { ApplicationCommandOption, Client, CommandInteraction } from "discord.js";
import { z } from "zod";

export type Command = {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    options?: ApplicationCommandOption[];
    run: (i: CommandInteraction, bot: BassBot) => Promise<void>;
};

export const commandSchema = z.object({
    name: z.string().nonempty("Command name is required."),
    description: z.string().nonempty("Command description is required."),
    aliases: z.array(z.string().nonempty("Command alias cant be empty")).optional(),
    usage: z.string().optional(),
    options: z.array(z.any()).optional(),
    run: z.function(),
});