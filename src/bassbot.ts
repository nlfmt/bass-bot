import { Client, ClientEvents, ClientOptions, Collection, GatewayDispatchEvents, Guild, TextChannel } from "discord.js";
import { Cluster } from "lavaclient";
import nodes from "@/lavalink/nodes.json";
import { LavasfyClient } from "lavasfy"
import { readdir } from "fs/promises";
import { join } from "path";
import { Command } from "@/types/command";
import { EventHandler, LCEventHandler, LCEventParams } from "./util/register";
import { TypedEmitter } from "tiny-typed-emitter";
import { EventEmitter } from "events";
import { BBPlayerEvents } from "./types/playerEvents";
import BBPlayer from "./util/bbplayer";

console.log(nodes);

class BassBot extends Client {
    commands: Collection<string, Command>;
    cluster: Cluster;
    // spotify: LavasfyClient;

    constructor(opts: ClientOptions) {
        super(opts);

        this.commands = new Collection();

        this.cluster = new Cluster({
            nodes,
            sendGatewayPayload: (id, payload) => {
                const guild = this.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            }
        });

        this.ws.on(GatewayDispatchEvents.VoiceServerUpdate, data => this.cluster.handleVoiceUpdate(data));
        this.ws.on(GatewayDispatchEvents.VoiceStateUpdate, data => this.cluster.handleVoiceUpdate(data));

        // this.spotify = new LavasfyClient({
        //     clientID: process.env.SPOTIFY_ID!,
        //     clientSecret: process.env.SPOTIFY_SECRET!,
        // }, nodes);
    }

    init() {
        this.loadCommands();
        this.loadEvents();

        this.login(process.env.TOKEN);
    }

    private async loadCommands() {
        const commandFiles = await readdir(join(__dirname, "commands"));
        console.log("Loading commands...");
        for (const file of commandFiles) {
            const command: Command = require(`./commands/${file}`)?.default;
            console.log(`✔ ${command.name}`);
            this.commands.set(command.name, command);
        };
    }

    private async loadEvents() {
        const dcEvents = await readdir(join(__dirname, "events/discord"));
        console.log("Loading discord events...");
        for (const file of dcEvents) {
            const handler: EventHandler = require(`./events/discord/${file}`)?.default;
            console.log(`✔ ${handler.event}`);
            this.on(handler.event, (...args: ClientEvents[keyof ClientEvents]) => handler.run(this, ...args));
        };

        const lcEvents = await readdir(join(__dirname, "events/lavalink"));
        console.log("Loading lavalink events...");
        for (const file of lcEvents) {
            const handler: LCEventHandler = require(`./events/lavalink/${file}`)?.default;
            console.log(`✔ ${handler.event}`);
            this.cluster.on(handler.event, (...args: LCEventParams) => handler.run(this, ...args));
        }
    }

    getPlayer(guild: Guild, textChannel: TextChannel) {
        return BBPlayer.get(this.cluster, guild, textChannel);
    }

}

export default BassBot;