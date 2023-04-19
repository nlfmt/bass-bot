import { Client, ClientEvents, ClientOptions, Collection, GatewayDispatchEvents, Guild, GuildTextBasedChannel, TextChannel } from "discord.js";
import nodes from "@/lavalink/nodes.json";
import { readdir } from "fs/promises";
import { join } from "path";
import { Command, commandSchema } from "@/types/command";
import { EventHandler, LCEventHandler, LCEventParams } from "./util/register";
import BBPlayer from "./util/bbplayer";
import Lavalink from "./lavalink/lavalink";

import env from "@/util/env";
import { toErrList } from "./util/errors";
import logger from "./util/logger";


class BassBot extends Client {
    commands: Collection<string, Command>;
    lavalink: Lavalink;;
    // spotify: LavasfyClient;

    constructor(opts: ClientOptions) {
        super(opts);

        this.commands = new Collection();

        this.lavalink = new Lavalink(this, nodes);

        // this.spotify = new LavasfyClient({
        //     clientID: process.env.SPOTIFY_ID!,
        //     clientSecret: process.env.SPOTIFY_SECRET!,
        // }, nodes);
    }

    init() {
        this.loadCommands();
        this.loadEvents();

        this.login(env.TOKEN);
    }

    private async loadCommands() {
        const commandFiles = await readdir(join(__dirname, "commands"));
        logger.info("Loading commands...");
        for (const file of commandFiles) {
            const command: Command = require(`./commands/${file}`)?.default;
            const res = commandSchema.safeParse(command);
            if (!res.success) {
                logger.warn(`❌ Command in "${file}" has invalid parameters:`);
                logger.warn(toErrList(res.error));
                continue;
            }
            logger.info(`✔ ${command.name}`);
            this.commands.set(command.name, command);
        };
    }

    private async loadEvents() {
        const dcEvents = await readdir(join(__dirname, "events/discord"));
        logger.info("Loading discord events...");
        for (const file of dcEvents) {
            const handler: EventHandler = require(`./events/discord/${file}`)?.default;
            logger.info(`✔ ${handler.event}`);
            this.on(handler.event, (...args: ClientEvents[keyof ClientEvents]) => handler.run(this, ...args));
        };

        const lcEvents = await readdir(join(__dirname, "events/lavalink"));
        logger.info("Loading lavalink events...");
        for (const file of lcEvents) {
            const handler: LCEventHandler = require(`./events/lavalink/${file}`)?.default;
            logger.info(`✔ ${handler.event}`);
            this.lavalink.on(handler.event, (...args: LCEventParams) => handler.run(this, ...args));
        }
    }

    getPlayer(guild: Guild, textChannel: GuildTextBasedChannel) {
        return BBPlayer.get(this.lavalink, guild, textChannel);
    }

}

export default BassBot;