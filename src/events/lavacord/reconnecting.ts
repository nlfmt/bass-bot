import { registerLCEvent } from "@/util/registerEvent";

export default registerLCEvent("reconnecting", async node => {
    console.log(`Node ${node.id} is trying to reconnect...`);
});