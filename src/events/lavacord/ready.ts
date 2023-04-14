import { registerLCEvent } from "@/util/registerEvent";

export default registerLCEvent("ready", async node => {
    console.log(`Node ${node.id} is ready!`);
});