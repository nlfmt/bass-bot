import { Client, ClientOptions, Collection } from "discord.js";
import { Manager } from "lavacord";
import nodes from "@/lavalink/nodes.json";
import { LavasfyClient } from "lavasfy"
import { readdir } from "fs/promises";
import { join } from "path";
import { Command } from "@/types/command";
import { EventHandler, LCEventHandler } from "./util/registerEvent";

console.log(nodes);

class BassBot extends Client {
    commands: Collection<string, Command>;
    manager: Manager;
    spotify: LavasfyClient;

    constructor(opts: ClientOptions) {
        super(opts);

        this.commands = new Collection();

        this.manager = new Manager(nodes, {
            user: this.user?.id,
            send: packet => {
                if (this.guilds.cache) {
                    const guild = this.guilds.cache.get(packet.d.guild_id);
                    if (guild) return guild.shard.send(packet);
                }
            }
        });

        this.spotify = new LavasfyClient({
            clientID: process.env.SPOTIFY_ID!,
            clientSecret: process.env.SPOTIFY_SECRET!,
        }, [...[...this.manager.nodes.values()]]);
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
            this.on(handler.event, handler.run);
        };

        const lcEvents = await readdir(join(__dirname, "events/lavacord"));
        console.log("Loading lavacord events...");
        for (const file of lcEvents) {
            const handler: LCEventHandler = require(`./events/lavacord/${file}`)?.default;
            console.log(`✔ ${handler.event}`);
            this.manager.on(handler.event as any, handler.run);
        }
    }

}

export default BassBot;