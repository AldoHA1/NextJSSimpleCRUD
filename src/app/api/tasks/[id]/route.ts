import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(result);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  const result = prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: data,
  });
  const response = await result;
  return NextResponse.json(response);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await prisma.task.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(result);
}
