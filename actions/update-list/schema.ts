import { z } from "zod";

export const UpdateList = z.object({
    title: z
        .string({
            error: "Title Is Required",
        })
        .trim()
        .min(1, {
            message: "Title Is Required",
        })
        .min(3, {
            message: "Title Is Too Short",
        }),
    id: z.string(),
    boardId: z.string(),
});
