export interface IManagementDashboardFilter {
    lineId: string | null;
    yardId: string | null;
    yardmasterId: string | null;
    motorpersonId: string | null;
    priorityOrder: string | null;
    moveReasonId: string | null;
    from: string | null;
    to: string | null;
    status: string | null;
    tagIds: string[] | null;
}