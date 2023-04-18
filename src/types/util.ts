import BassBot from "@/bassbot";

export type CallbackWithBot<T extends (...args: any[]) => any> = (bot: BassBot, ...args: Parameters<T>) => ReturnType<T>;