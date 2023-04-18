import { registerEvent } from "@/util/register";

export default registerEvent("interactionCreate", async (bot, i) => {
    if (!i.isCommand()) return;

    const cmd = bot.commands.get(i.commandName);
    if (!cmd) return;

    try {
        await cmd.run(i, bot);
    } catch (err) {
        console.error(err);
        await i.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})