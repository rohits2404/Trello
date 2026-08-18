import { z } from "zod";

export const UpdateCard = z.object({
    boardId: z.string().min(1, {
        message: "Board ID Is Required",
    }),

    description: z
        .string()
        .min(3, {
            message: "Description Is Too Short.",
        })
        .optional(),

    title: z.optional(
        z
            .string({
                error: "Title Is Required",
            })
            .min(3, {
                message: "Title Is Too Short",
            }),
    ),

    id: z.string().min(1, {
        message: "Card ID Is Required",
    }),
});
