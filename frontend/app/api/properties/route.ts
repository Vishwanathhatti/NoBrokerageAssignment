import { getProperties, createProperty } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const properties = await getProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const property = await createProperty(data);
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
