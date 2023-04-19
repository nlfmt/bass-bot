import logger from "@/util/logger";
import { registerLCEvent } from "@/util/register";

export default registerLCEvent("nodeDisconnect", async (client, node, ev) => {
    logger.info(`Node ${node.id} disconnected, reason: ${ev.code} ${ev.reason}`);
});