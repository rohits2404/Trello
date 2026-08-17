import { z } from "zod";

export const UpdateBoard = z.object({
    title: z
        .string({
            error: "Title Is Required",
        })
        .min(3, {
            message: "Title Is Too Short",
        }),

    id: z.string(),
});
