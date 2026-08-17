import { ListContainer } from "@/features/platform/dashboard/board/components/list-container";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const { orgId } = await auth();

    if (!orgId) {
        redirect("/select-org");
    }

    const { boardId } = await params;

    const lists = await db.list.findMany({
        where: {
            boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    });

    return (
        <div className="h-full overflow-x-auto p-4">
            <ListContainer boardId={boardId} data={lists} />
        </div>
    );
};

export default BoardIdPage;
