import { getPropertyById, updateProperty, deleteProperty } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const property = await getPropertyById(params.id);
    if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const property = await updateProperty(params.id, data);
    if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteProperty(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
