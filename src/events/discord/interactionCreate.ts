import logger from "@/util/logger";
import { registerEvent } from "@/util/register";

export default registerEvent("interactionCreate", async (bot, i) => {
    if (!i.isCommand()) return;

    const cmd = bot.commands.get(i.commandName);
    if (!cmd) return;

    try {
        await cmd.run(i, bot);
    } catch (err) {
        logger.error("interactionCreate", String(err));
        await i.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})