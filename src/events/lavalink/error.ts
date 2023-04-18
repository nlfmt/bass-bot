import { registerLCEvent } from "@/util/register";

export default registerLCEvent("nodeError", async (client, node, error) => {
    console.log(`Node ${node.id} encountered an error: ${error.message}`);
});