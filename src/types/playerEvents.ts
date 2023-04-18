import { Client } from "discord.js";
import type { ClusterNode, PlayerEvents as LCPlayerEvent, Player } from "lavaclient";

export type PlayerEvents = {
    [K in keyof LCPlayerEvent]: LCPlayerEvent[K];
}
export type BBPlayerEvents = {
    [K in keyof LCPlayerEvent]: (client: Client, player: Player<ClusterNode>, ...args: Parameters<LCPlayerEvent[K]>) => void;
}