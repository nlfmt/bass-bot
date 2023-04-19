import BassBot from "@/bassbot";
import logger from "@/util/logger";
import { registerEvent } from "@/util/register";
import { GatewayDispatchEvents as GWEvent } from "discord.js";

export default registerEvent("ready", async (client) => {
    logger.info(`Logged in as ${client.user!.tag}`);

    // await client.spotify.requestToken();

    client.lavalink.userId = client.user!.id;

    const cb = (d: any) => client.lavalink.handleVoiceUpdate(d);
    // client.ws.on(GWEvent.VoiceServerUpdate, cb)
    //          .on(GWEvent.VoiceStateUpdate, cb);

    client.lavalink.connect();
});
