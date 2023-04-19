import { BBPlayerEvents, PlayerEvents } from "@/types/playerEvents";
import { Client, GatewayDispatchEvents } from "discord.js";
import { EventEmitter } from "events";
import { Cluster, ClusterNode, ClusterNodeOptions, Player } from "lavaclient";
import { TypedEmitter } from "tiny-typed-emitter";

class Lavalink extends Cluster {
    // cluster: Cluster;
    // private players: Map<string, Player<ClusterNode>>;
    // player: TypedEmitter<BBPlayerEvents>;
    client: Client;

    constructor(client: Client, nodes: ClusterNodeOptions[]) {
        super({
            nodes,
            sendGatewayPayload: (id, payload) => {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            }
        })
        this.client = client;

        client.ws.on(GatewayDispatchEvents.VoiceServerUpdate, data => this.handleVoiceUpdate(data));
        client.ws.on(GatewayDispatchEvents.VoiceStateUpdate, data => this.handleVoiceUpdate(data));

        // this.player = new EventEmitter() as TypedEmitter<BBPlayerEvents>;

        // this.players = new Map();
    }

    // getPlayer(guildId: string): Player {
    //     let player = this.players.get(guildId);
    //     if (!player) {
    //         player = this.cluster.createPlayer(guildId);

    //         player.emit = <K extends keyof PlayerEvents>(event: K, ...args: Parameters<PlayerEvents[K]>) => {
    //             return (this.player.emit as any)(event, this.client, player!, ...args);
    //         };

    //         this.players.set(guildId, player);
    //     } 
    //     return player;
    // }
}

export default Lavalink;