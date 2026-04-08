import { NextResponse } from "next/server";
import { readData } from "@/app/_lib/store";

export async function GET() {
  const data = await readData();
  return NextResponse.json(data.education);
}
