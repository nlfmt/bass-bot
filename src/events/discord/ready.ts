import BassBot from "@/bassbot";
import { registerEvent } from "@/util/register";
import { GatewayDispatchEvents as GWEvent } from "discord.js";

export default registerEvent("ready", async (client) => {
    console.log(`Logged in as ${client.user!.tag}`);

    // await client.spotify.requestToken();

    client.cluster.userId = client.user!.id;

    const cb = (d: any) => client.cluster.handleVoiceUpdate(d);
    // client.ws.on(GWEvent.VoiceServerUpdate, cb)
    //          .on(GWEvent.VoiceStateUpdate, cb);

    client.cluster.connect();
});
