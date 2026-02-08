import axios from 'axios';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const GET = async (_req: Request, { params }: RouteContext) => {
  const { id } = await params;

  try {
    const response = await axios.get(`${API_URL}/products/${id}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.statusText ?? 'API error' },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
};
