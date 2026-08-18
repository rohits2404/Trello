import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "@/features/platform/dashboard/billing/components/subscription-button";
import { Info } from "@/features/platform/dashboard/organization/components/info";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const BillingPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className="w-full">
            <Info isPro={isPro} />
            <Separator className="my-2" />
            <SubscriptionButton isPro={isPro} />
        </div>
    );
};

export default BillingPage;
