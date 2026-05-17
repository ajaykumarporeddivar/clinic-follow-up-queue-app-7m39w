import {
  MOCK_CLINIC_LOCATIONS,
  MOCK_CLIENTS,
  MOCK_INTAKE_RECORDS,
  MOCK_FOLLOW_UP_TASKS,
  MOCK_REPORTS,
  STATS,
} from '@/lib/data';
import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(): Promise<Response> {
  const data = {
    clinicLocations: MOCK_CLINIC_LOCATIONS,
    clients: MOCK_CLIENTS,
    intakeRecords: MOCK_INTAKE_RECORDS,
    followUpTasks: MOCK_FOLLOW_UP_TASKS,
    reports: MOCK_REPORTS,
    stats: STATS,
  };

  const total = {
    clinicLocations: MOCK_CLINIC_LOCATIONS.length,
    clients: MOCK_CLIENTS.length,
    intakeRecords: MOCK_INTAKE_RECORDS.length,
    followUpTasks: MOCK_FOLLOW_UP_TASKS.length,
    reports: MOCK_REPORTS.length,
  };

  return NextResponse.json(
    {
      ok: true,
      data,
      total,
    },
    { headers: CORS_HEADERS },
  );
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        ok: true,
        message: 'Demo mode — data not persisted. Received your payload.',
        received: body,
      },
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid JSON payload.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS_HEADERS });
}