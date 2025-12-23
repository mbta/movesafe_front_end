import { IApiError, ICar, ICreateMove, IMove, IMoveReason } from "@repo/models";

export async function fetchUnassignedMoves(
  yardId: string | undefined,
  currentPage: number,
  authToken: string
): Promise<{ data: IMove[]; pageCount: number }> {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/unassigned-moves?yard_id=${yardId}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data: { data: IMove[]; pageCount: number } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { data: [], pageCount: 0 };
  }
}

export async function assignMove(
  moveId: string,
  authToken: string
): Promise<IMove> {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/assign-move?move_id=${moveId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();

    if (response.status !== 200) throw new Error(data.message);

    setTimeout(() => {
      return data;
    }, 3000);
    return data;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}

export async function fetchMovesHistory(
  date: string,
  currentPage: number,
  authToken: string
): Promise<{ data: IMove[]; pageCount: number }> {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/move-history?date=${date}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data: { data: IMove[]; pageCount: number } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { data: [], pageCount: 0 };
  }
}

export async function fetchAssignedMove(
  authToken: string
): Promise<IMove | null> {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/assigned-move`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 404) {
      return null;
    }

    const data: IMove = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function fetchPendingMove(
  yardId: string | undefined,
  currentPage: number,
  authToken: string
): Promise<{ data: IMove[]; pageCount: number }> {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pending-moves?yard_id=${yardId}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data: { data: IMove[]; pageCount: number } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { data: [], pageCount: 0 };
  }
}

export async function fetchMoveReasons(
  isSatelliteYard: boolean,
  authToken: string
): Promise<IMoveReason[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/move-reasons?is_satellite_yard=${isSatelliteYard}`;
    const response: Response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const moveReasons: IMoveReason[] = await response.json();
    return moveReasons;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCars(
  lineId: string,
  authToken: string
): Promise<ICar[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cars?line_id=${lineId}`;
    const response: Response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const cars: ICar[] = await response.json();
    return cars;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function sendMoveApi(
  data: ICreateMove[],
  authToken: string
): Promise<ICreateMove | IApiError> {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/move`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (request.status !== 200) {
      const errorResponse: any = await request.json();
      return {
        statusCode: request.status,
        errorMessage: errorResponse.message,
      };
    }

    const response: ICreateMove = await request.json();
    return response;
  } catch (error: any) {
    return {
      statusCode: 500,
      errorMessage: "Error sending move, error: " + error?.toString(),
    };
  }
}
