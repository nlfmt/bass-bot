import { registerLCEvent } from "@/util/registerEvent";

export default registerLCEvent("error", async (error, node) => {
    console.log(error)
    console.log(`Node ${node.id} encountered an error: ${(error as any)?.message}`);
});