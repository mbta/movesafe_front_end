import { IApiError, IInspectionAnswer, IMove, ISignature, IYardPerson } from "@repo/models";

export async function sendSignature(data: FormData, authToken: string): Promise<ISignature | IApiError> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signature`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            body: data,
        });

        if (request.status !== 200) {
            const errorResponse: any = await request.json();
            return {
                statusCode: request.status,
                errorMessage: errorResponse.message,
            };
        }

        const response: ISignature = await request.json();
        return response;
    } catch (error: any) {
        return {
            statusCode: 500,
            errorMessage: "Error sending signature, error: " + error?.toString(),
        };
    }
};

export async function sendMoveResult(answers: IInspectionAnswer[], moveId: string, authToken: string): Promise<IMove | IApiError> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/move-result`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answers: answers,
                move_id: moveId,
            }),
        });

        if (request.status !== 200) {
            const errorResponse: any = await request.json();
            return {
                statusCode: request.status,
                errorMessage: errorResponse.message,
            };
        }

        const response: IMove = await request.json();
        return response;
    } catch (error: any) {
        return {
            statusCode: 500,
            errorMessage: "Error sending move result, error: " + error?.toString(),
        };
    }
};

export async function releaseMove(moveId: string, authToken: string): Promise<IMove | IApiError> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/release-move?move_id=${moveId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (request.status !== 200) {
            const errorResponse: any = await request.json();
            return {
                statusCode: request.status,
                errorMessage: errorResponse.message,
            };
        }

        const response: IMove = await request.json();
        return response;
    } catch (error: any) {
        return {
            statusCode: 500,
            errorMessage: "Error releasing move, error: " + error?.toString(),
        };
    }
};

export async function fetchYardMotorPersons(authToken: string, lineId: string): Promise<IYardPerson[]> {
    try {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/yard-motor-persons-by-line?line_id=${lineId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (response.status !== 200) return [];

        const motorPersons: IYardPerson[] = await response.json();
        return motorPersons;
    } catch (error: any) {
        return [];
    }
};