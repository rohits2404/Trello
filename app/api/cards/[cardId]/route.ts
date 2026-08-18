import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const { cardId } = await params;

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!card) {
      return new NextResponse("Card not found", {
        status: 404,
      });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("[CARD_GET]", error);

    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}