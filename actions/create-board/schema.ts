import { z } from "zod";

export const CreateBoard = z.object({
    title: z
        .string({
            error: "Title Is Required",
        })
        .min(3, {
            error: "Title Is Too Short.",
        }),
});
