import { z } from "zod";

export const CreateCard = z.object({
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

    boardId: z.string().min(1, {
        message: "Board ID Is Required",
    }),

    listId: z.string().min(1, {
        message: "List ID Is Required",
    }),
});
