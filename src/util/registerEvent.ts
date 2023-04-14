import { ClientEvents } from "discord.js";
import { LavalinkNode, WebsocketCloseEvent } from "lavacord";

export interface ManagerEvents {
    ready: [LavalinkNode];
    raw: [unknown, LavalinkNode];
    error: [unknown, LavalinkNode];
    disconnect: [WebsocketCloseEvent, LavalinkNode];
    reconnecting: [LavalinkNode];
}

export function registerEvent<K extends keyof ClientEvents>(event: K, run: (...args: ClientEvents[K]) => Promise<void>|void) {
    return { event, run };
}

export type EventHandler = ReturnType<typeof registerEvent>;


export function registerLCEvent<K extends keyof ManagerEvents>(event: K, run: (...args: ManagerEvents[K]) => Promise<void>|void) {
    return { event, run };
}

export type LCEventHandler = ReturnType<typeof registerLCEvent>;