import { NextResponse } from "next/server";

let settings = {
  deliveryFee: 150,
  freeShippingMin: 2000,
  estimatedDelivery: "3-5 business days",
  minCodOrder: 0,
  maxCodOrder: 50000,
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    settings = { ...settings, ...body };
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 400 }
    );
  }
}
