import { registerLCEvent } from "@/util/register";

export default registerLCEvent("nodeDisconnect", async (client, node, ev) => {
    console.log(`Node ${node.id} disconnected, reason: ${ev.code} ${ev.reason}`);
});