import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.text();

    const signature = (await headers()).get("Stripe-Signature");

    if (!signature) {
        return new NextResponse("Missing Stripe Signature", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    } catch (error) {
        return new NextResponse("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.metadata?.orgId) {
            return new NextResponse("Org ID is required", { status: 400 });
        }

        if (!session.subscription) {
            return new NextResponse("Subscription is required", {
                status: 400,
            });
        }

        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        const subscriptionItem = subscription.items.data[0];

        await db.orgSubscription.create({
            data: {
                orgId: session.metadata.orgId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscriptionItem.price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscriptionItem.current_period_end * 1000,
                ),
            },
        });
    }

    if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object as Stripe.Invoice;

        const subscriptionId =
            invoice.parent?.subscription_details?.subscription;

        if (!subscriptionId) {
            return new NextResponse("Subscription is required", {
                status: 400,
            });
        }

        const subscription = await stripe.subscriptions.retrieve(
            subscriptionId as string,
        );

        const subscriptionItem = subscription.items.data[0];

        await db.orgSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscriptionItem.price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscriptionItem.current_period_end * 1000,
                ),
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
