import BassBot from "@/bassbot";
import { Command } from "@/types/command";
import { CallbackWithBot } from "@/types/util";
import { ClientEvents } from "discord.js";
import { ClusterEvents } from "lavaclient";

export function registerEvent<K extends keyof ClientEvents>(event: K, run: (bot: BassBot, ...args: ClientEvents[K]) => Promise<void>|void) {
    return { event, run };
}

export type EventHandler = ReturnType<typeof registerEvent>;


export function registerLCEvent<K extends keyof ClusterEvents>(event: K, run: CallbackWithBot<ClusterEvents[K]>) {
    return { event, run };
}

export type LCEventParams = Parameters<ClusterEvents[keyof ClusterEvents]>;
export type LCEventHandler = ReturnType<typeof registerLCEvent>;


export function createCommand(cmd: Command) {
    return cmd;
}