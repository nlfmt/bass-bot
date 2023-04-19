import { ZodError } from "zod";

export function toErrList(err: ZodError) {
    return Object.entries(err.flatten().fieldErrors)
        .map(([k, v]) => ` - ${k}: ${v?.[0]}`)
        .join("\n");
}