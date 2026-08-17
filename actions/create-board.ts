"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
    errors?: {
        title?: string[];
    };
    message: string;
};

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum Length Of 3 Letters Is Required",
    }),
});

export async function create(
    prevState: State,
    formData: FormData,
): Promise<State> {
    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields.",
        };
    }

    const { title } = validatedFields.data;

    try {
        await db.board.create({
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            message: "Database Error",
        };
    }

    revalidatePath("/organization/org_3I3KoToj2fY4XFWLsQiZKIWGiEq");
    redirect("/organization/org_3I3KoToj2fY4XFWLsQiZKIWGiEq");
}
