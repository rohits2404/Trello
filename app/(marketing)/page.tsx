import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Marketing } from "@/features/marketing";

const MarketingPage = async () => {
    const { userId, orgId } = await auth();

    if (userId && orgId) {
        redirect(`/organization/${orgId}`);
    }

    return <Marketing />;
};

export default MarketingPage;
