export interface IInspectionStat {
    totalInspections: number,
    totalLightRailInspections: number,
    totalHeavyInspections: number,
    concludedLightRailInspections: number,
    concludedHeavyRailInspections: number,
    totalEviInspectionsForLightRail: number,
    totalEviInspectionsForHeavyRail: number,
    totalPreTripInspectionsForLightRail: number,
    totalPreTripInspectionsForHeavyRail: number,
    totalCarHouseInspectionsForLightRail: number,
    totalCarHouseInspectionsForHeavyRail: number,
    totalSafetyInspectionsForLightRail: number,
    totalSafetyInspectionsForHeavyRail: number
}