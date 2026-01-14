"use client"

import { IApiError, IInspectionStat, ILine, IManagementDashboardFilter, IMove, IMoveDetails, IMoveReason, ISignature, ITag, IYard, IYardPerson, RailOptions } from "@repo/models";

export async function fetchMoveReasons(isSatelliteYard: boolean, authToken: string): Promise<IMoveReason[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/move-reasons?is_satellite_yard=${isSatelliteYard}`;
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) return [];

    const moveReasons: IMoveReason[] = await response.json();
    return moveReasons;
  } catch (error: any) {
    return [];
  }
}

export async function fetchLines(authToken: string): Promise<ILine[]> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) return [];

    const lines: ILine[] = await response.json();
    return lines;
  } catch (error: any) {
    return [];
  }
};

export async function fetchYardmasters(authToken: string): Promise<IYardPerson[]> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/yardmasters`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) return [];

    const yardmasters: IYardPerson[] = await response.json();
    return yardmasters;
  } catch (error: any) {
    return [];
  }
};

export async function fetchMotorpersons(authToken: string): Promise<IYardPerson[]> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/yard-motor-persons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) return [];

    const motorpersons: IYardPerson[] = await response.json();
    return motorpersons;
  } catch (error: any) {
    return [];
  }
};

export async function fetchYards(lineId: string, authToken: string): Promise<IYard[]> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/yards?line_id=${lineId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) return [];

    const yards: IYard[] = await response.json();
    return yards;
  } catch (error: any) {
    return [];
  }
};

export async function fetchTags(authToken: string): Promise<ITag[]> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) return [];

    const tags: ITag[] = await response.json();
    return tags;
  } catch (error: any) {
    return [];
  }
};

export async function fetchMovesByDate(
  dates: [Date | null, Date | null],
  railOption: RailOptions,
  currentPage: number,
  filter: IManagementDashboardFilter | null,
  authToken: string
): Promise<{ data: IMove[]; pageCount: number }> {
  try {
    const startDate: string = dates[0]?.toISOString()?.split("T")[0] ?? "";
    const endDate: string = dates[1]?.toISOString()?.split("T")[0] ?? "";

    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/moves-by-date?date_from=${startDate}&date_to=${endDate}&rail_type=${railOption}&page=${currentPage}&is_dashboard=false`;

    url += returnMovesByDateFilterParams(filter);

    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    const moves: { data: IMove[]; pageCount: number } =
      await response.json();

    return moves;
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}

const returnMovesByDateFilterParams = (filter: IManagementDashboardFilter | null): string => {
  let params: string = ``;

  if (!filter) return params;

  if (filter.lineId) {
    params += `&line_id=${filter.lineId}`;
  }

  if (filter.yardId) {
    params += `&yard_id=${filter.yardId}`;
  }

  if (filter.priorityOrder) {
    params += `&priority_order=${filter.priorityOrder}`;
  }

  if (filter.moveReasonId) {
    params += `&reason_id=${filter.moveReasonId}`;
  }

  if (filter.from) {
    params += `&from=${filter.from}`;
  }

  if (filter.to) {
    params += `&to=${filter.to}`;
  }

  if (filter.status) {
    params += `&status=${filter.status}`;
  }

  if (filter.yardmasterId) {
    params += `&yardmaster_user_id=${filter.yardmasterId}`;
  }

  if (filter.motorpersonId) {
    params += `&employee_user_id=${filter.motorpersonId}`;
  }

  if (filter.tagIds && filter.tagIds.length) {
    params += `&tag_ids=${filter.tagIds.join(',')}`;
  }

  return params;
}

const emptyStat: IInspectionStat = {
  totalInspections: 0,
  totalLightRailInspections: 0,
  totalHeavyInspections: 0,
  totalEviInspectionsForLightRail: 0,
  totalEviInspectionsForHeavyRail: 0,
  totalPreTripInspectionsForLightRail: 0,
  totalPreTripInspectionsForHeavyRail: 0,
  totalCarHouseInspectionsForLightRail: 0,
  totalCarHouseInspectionsForHeavyRail: 0,
  totalSafetyInspectionsForLightRail: 0,
  totalSafetyInspectionsForHeavyRail: 0,
  concludedLightRailInspections: 0,
  concludedHeavyRailInspections: 0,
}

export async function fetchInspectionStatsForDay(
  dates: [Date | null, Date | null],
  authToken: string): Promise<IInspectionStat> {
  try {
    const startDate: string = dates[0]?.toISOString()?.split("T")[0] ?? "";
    const endDate: string = dates[1]?.toISOString()?.split("T")[0] ?? "";

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspection-stats-for-day?date_from=${startDate}&date_to=${endDate}`;

    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    const inspectionStats: IInspectionStat = await response.json();

    return inspectionStats;
  } catch (error) {
    return emptyStat;
  }
}

export async function fetchMoveDetails(move_id: string, authToken: string): Promise<IMoveDetails | IApiError> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/move-details?move_id=${move_id}`;

    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) {
      const errorResponse: any = await response.json();
      return {
        statusCode: response.status,
        errorMessage: errorResponse.message,
      }
    }

    const moveDetails: IMoveDetails = await response.json();

    return moveDetails;
  } catch (error: any) {
    return {
      statusCode: 500,
      errorMessage: "Error releasing move, error: " + error?.toString(),
    }
  }
}

export async function sendSignature(data: FormData, authToken: string): Promise<ISignature | IApiError> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signature`, {
      method: "POST",
      body: data,
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) {
      const errorResponse: any = await response.json();
      return {
        statusCode: response.status,
        errorMessage: errorResponse.message,
      }
    }

    const signature: ISignature = await response.json();
    return signature;
  } catch (error: any) {
    return {
      statusCode: 500,
      errorMessage: "Error sending signature, error: " + error?.toString(),
    }
  }
};

export async function cancelMove(move_id: string, authToken: string): Promise<IMove | IApiError> {
  try {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cancel-move?move_id=${move_id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) {
      const errorResponse: any = await response.json();
      return {
        statusCode: response.status,
        errorMessage: errorResponse.message,
      }
    }

    const move: IMove = await response.json();
    return move;
  } catch (error: any) {
    return {
      statusCode: 500,
      errorMessage: "Error sending signature, error: " + error?.toString(),
    }
  }
};