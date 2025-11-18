import { ILine, IYard } from "@repo/models";

export async function fetchLines(authToken: string): Promise<ILine[]> {
    try {
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (response.status !== 200) {
            return [];
        }

        const lines: ILine[] = await response.json();
        return lines;
    } catch (error) {
        console.log(error);
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

        if (response.status !== 200) {
            return [];
        }

        const yards: IYard[] = await response.json();
        return yards;
    } catch (error) {
        console.log(error);
        return [];
    }
};