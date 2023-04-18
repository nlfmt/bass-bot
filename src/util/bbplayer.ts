import { ChannelType, Guild, TextChannel } from "discord.js";
import { Cluster, Player } from "lavaclient";
import { TrackEndReason } from "lavalink-api-types";

class BBPlayer {
    private static players: Map<string, BBPlayer> = new Map();

    private player: Player;
    private textChannel: TextChannel;

    static get(cluster: Cluster, guild: Guild, textChannel: TextChannel) {
        const player = BBPlayer.players.get(guild.id);
        return player ?? new BBPlayer(cluster, guild, textChannel);
    }

    private constructor(cluster: Cluster, guild: Guild, textChannel: TextChannel) {
        const player = cluster.getPlayer(guild.id);
        this.player = player ?? cluster.createPlayer(guild.id);
        this.textChannel = textChannel;

        if (!player) this.addListeners();
        BBPlayer.players.set(guild.id, this);
    }


    trackStart(track: string) {
        console.log("track started:", track);
    }

    trackEnd(track: string | null, reason: TrackEndReason) {
        console.log("track ended:", track, reason);
    }

    trackException(track: string | null, error: Error) {
        console.log("track exception:", track, error);
    }

    trackStuck(track: string | null, thresholdMs: number) {
        console.log("track stuck:", track, thresholdMs);
    }

    channelJoin(joined: string) {
        console.log("channel joined:", joined);
    }

    channelLeave(left: string) {
        console.log("channel left:", left);
    }

    channelMove(from: string, to: string) {
        console.log("channel moved:", from, to);
    }

    disconnected(code: number, reason: string, byRemote: boolean) {
        console.log("disconnected:", code, reason, byRemote);
    }

    private addListeners() {
        this.player.on("trackStart", this.trackStart.bind(this));
        this.player.on("trackEnd", this.trackEnd.bind(this));
        this.player.on("channelJoin", this.channelJoin.bind(this));
        this.player.on("channelLeave", this.channelLeave.bind(this));
        this.player.on("channelMove", this.channelMove.bind(this));
        this.player.on("disconnected", this.disconnected.bind(this));
        this.player.on("trackException", this.trackException.bind(this));
        this.player.on("trackStuck", this.trackStuck.bind(this));
    }
}

export default BBPlayer;