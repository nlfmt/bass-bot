import { ApplicationCommandOptionType } from "discord.js";
import { createCommand } from "@/util/register";

export default createCommand({
    name: 'play',
    description: 'Play a song',
    options: [
        {
            name: 'song',
            type: ApplicationCommandOptionType.String,
            description: 'The song you want to play.',
        }
    ],
    async run(i, bot) {

    }
})
