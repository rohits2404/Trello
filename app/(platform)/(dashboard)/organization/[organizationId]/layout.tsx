import { OrgControl } from "@/features/platform/dashboard/organization/components/org-control";
import React from "react";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
};

export default OrganizationIdLayout;
