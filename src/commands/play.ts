import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
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

        if (!(i instanceof ChatInputCommandInteraction)) return;

        const song = i.options.getString('song');
        if (!song) return void i.reply({ content: 'Please provide a song!', ephemeral: true });

        const player = bot.getPlayer(i.guild, i.channel!);
        if (!player.connected) player.connect(i.member.voice.channelId!);

        const res = await bot.lavalink.rest?.loadTracks("ytsearch:"+song);

        if (res) {
            player.play(res.tracks[0].track);
            i.reply({ content: `Playing ${res.tracks[0].info.title}` });
        }
    }
})
