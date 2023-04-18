import { registerLCEvent } from "@/util/register";

export default registerLCEvent("nodeConnect", async (client, node, ev) => {
    console.log(`Node ${node.id} ${ev.reconnect ? "reconnected" : "is ready"}! (${ev.took}s)`);
});