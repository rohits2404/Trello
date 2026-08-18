type AuditLog = {
    id: string;
    action: "CREATE" | "UPDATE" | "DELETE";
    entityId: string;
    entityType: string;
    entityTitle: string;
    createdAt: Date | string;
};

export const generateLogMessage = (log: AuditLog) => {
    const { action, entityTitle, entityType } = log;

    switch (action) {
        case "CREATE":
            return `Created ${entityType.toLowerCase()} "${entityTitle}"`;

        case "UPDATE":
            return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;

        case "DELETE":
            return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;

        default:
            return `Unknown Action ${entityType.toLowerCase()} "${entityTitle}"`;
    }
};
