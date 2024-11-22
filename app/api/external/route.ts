import { NextResponse } from "next/server";

const EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts";
export async function GET() {
  try {
    const response = await fetch(EXTERNAL_API_URL);
    if (!response.ok) {
      return NextResponse.json(
        { sucess: false, message: "Fetch the data from the API" },
        {
          status: response.status,
        }
      );
    }
    const data = await response.json();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      sucsess: false,
      maessage: "get the error!",
      error: error.message,
    });
  }
}
