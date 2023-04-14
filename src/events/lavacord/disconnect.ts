import { registerLCEvent } from "@/util/registerEvent";

export default registerLCEvent("disconnect", async (ev, node) => {
    console.log(`Node ${node.id} disconnected, reason: ${ev.code} ${ev.reason}`);
});