import { ICreateMove, IApiError, IMove, IMoveReason } from "@repo/models";

export async function fetchMovesByDate(
  date: string,
  yard_id: string,
  currentPage: number,
  authToken: string
): Promise<{ data: IMove[]; pageCount: number }> {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/moves-by-date-and-yard?date=${date}&yard_id=${yard_id}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const moves: { data: IMove[]; pageCount: number } = await response.json();
    return moves;
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function fetchCars(lineId: any, authToken: string): Promise<any> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cars?line_id=${lineId}`;
    const response: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const cars: any = await response.json();
    return cars;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchYardMotorpersons(
  lineId: any,
  authToken: string
): Promise<any> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/yard-motor-persons-by-line?line_id=${lineId}`;
    const response: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const yardMotorpersons: any = await response.json();
    return yardMotorpersons;
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
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
