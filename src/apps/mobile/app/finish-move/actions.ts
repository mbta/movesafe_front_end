import { IApiError, IMove } from "@repo/models";

export async function updateMove(moveId: string, authToken: string): Promise<IMove | IApiError> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/executed-move?move_id=${moveId}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status !== 200) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }

    const data = await response.json();
    setTimeout(() => {
      return data;
    }, 3000);
    return data;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}

export async function returnMove(moveId: string, authToken: string): Promise<IMove | IApiError> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/release-move?move_id=${moveId}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status !== 200) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }

    const data = await response.json();
    setTimeout(() => {
      return data;
    }, 3000);
    return data;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}
