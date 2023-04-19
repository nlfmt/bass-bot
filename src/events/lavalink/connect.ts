import logger from "@/util/logger";
import { registerLCEvent } from "@/util/register";

export default registerLCEvent("nodeConnect", async (client, node, ev) => {
    logger.info(`Node ${node.id} ${ev.reconnect ? "reconnected" : "is ready"}! (${ev.took}s)`);
});