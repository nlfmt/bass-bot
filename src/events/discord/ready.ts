import BassBot from "@/bassbot";
import { registerEvent } from "@/util/registerEvent";
import { GatewayDispatchEvents as GWEvent } from "discord.js";

export default registerEvent("ready", async (_client) => {
    const client = _client as BassBot;
    console.log(`Logged in as ${_client.user.tag}`);

    await client.spotify.requestToken();

    client.manager.user = client.user!.id;

    client.ws
        .on(GWEvent.VoiceServerUpdate, client.manager.voiceServerUpdate.bind(client.manager))
        .on(GWEvent.VoiceStateUpdate, client.manager.voiceStateUpdate.bind(client.manager))
        .on(GWEvent.GuildCreate, async (data) => {
            for (const state of data.voice_states)
                await client.manager.voiceStateUpdate({ ...state, guild_id: data.id });
        });

    for (const node of client.manager.nodes.values()) {
        try {
            await node.connect();
        } catch (e) {
            client.manager.emit("error", e, node);
        }
    }
});
