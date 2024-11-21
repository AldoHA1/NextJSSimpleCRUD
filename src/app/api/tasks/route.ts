import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

type Task = {
  title: string;
  description?: string;
};
export async function GET() {
  const results = await prisma.task.findMany();
  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const { title, description }: Task = await request.json();
  const response = await prisma.task.create({ data: { title, description } });
  return NextResponse.json(response);
}
