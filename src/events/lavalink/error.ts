import logger from "@/util/logger";
import { registerLCEvent } from "@/util/register";

export default registerLCEvent("nodeError", async (client, node, error) => {
    logger.error("lavalink", `Node ${node.id} encountered an error: ${error.message}`);
});