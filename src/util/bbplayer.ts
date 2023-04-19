import { ChannelType, Guild, GuildTextBasedChannel, TextChannel } from "discord.js";
import { Cluster, Player } from "lavaclient";
import { TrackEndReason } from "lavalink-api-types";
import logger from "./logger";

class BBPlayer extends Player {
    private static players: Map<string, BBPlayer> = new Map();

    private textChannel: GuildTextBasedChannel;

    static get(cluster: Cluster, guild: Guild, textChannel: GuildTextBasedChannel) {
        const player = BBPlayer.players.get(guild.id);
        return player ?? new BBPlayer(cluster, guild, textChannel);
    }

    private constructor(cluster: Cluster, guild: Guild, textChannel: GuildTextBasedChannel) {
        const player = cluster.getPlayer(guild.id) ?? cluster.createPlayer(guild.id);
        super(player.node, guild.id);
        Object.assign(this, player);
        this.textChannel = textChannel;

        this.addListeners();
        BBPlayer.players.set(guild.id, this);
    }


    trackStart(track: string) {
        logger.info(`track started: ${track}`);
    }

    trackEnd(track: string | null, reason: TrackEndReason) {
        logger.info(`track ended: ${track} because ${reason}`);
        this.stop();
    }

    trackException(track: string | null, error: Error) {
        logger.info(`track exception: ${track} because ${error}`);
    }

    trackStuck(track: string | null, thresholdMs: number) {
        logger.info(`track stuck: ${track} because ${thresholdMs}`);
    }

    channelJoin(joined: string) {
        logger.info(`channel joined: ${joined}`);
    }

    channelLeave(left: string) {
        logger.info(`channel left: ${left}`);
    }

    channelMove(from: string, to: string) {
        logger.info(`channel moved: ${from} to ${to}`);
    }

    disconnected(code: number, reason: string, byRemote: boolean) {
        logger.info(`disconnected: ${code} because ${reason} by remote: ${byRemote}`);
    }

    private addListeners() {
        this.on("trackStart", this.trackStart.bind(this));
        this.on("trackEnd", this.trackEnd.bind(this));
        this.on("channelJoin", this.channelJoin.bind(this));
        this.on("channelLeave", this.channelLeave.bind(this));
        this.on("channelMove", this.channelMove.bind(this));
        this.on("disconnected", this.disconnected.bind(this));
        this.on("trackException", this.trackException.bind(this));
        this.on("trackStuck", this.trackStuck.bind(this));
    }
}

export default BBPlayer;