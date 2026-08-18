import { Separator } from "@/components/ui/separator";
import { ActivityList } from "@/features/platform/dashboard/activity/components/activity-list";
import { Info } from "@/features/platform/dashboard/organization/components/info";
import React, { Suspense } from "react";

const ActivityPage = () => {
    return (
        <div className="w-full">
            <Info />
            <Separator className="my-2" />
            <Suspense fallback={<ActivityList.Skeleton />}>
                <ActivityList />
            </Suspense>
        </div>
    );
};

export default ActivityPage;
