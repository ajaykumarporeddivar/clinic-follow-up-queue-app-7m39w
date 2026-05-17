import {
  MOCK_CLINIC_LOCATIONS,
  MOCK_CLIENTS,
  MOCK_INTAKE_RECORDS,
  MOCK_FOLLOW_UP_TASKS,
  MOCK_REPORTS,
} from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

interface SearchableItem {
  id: string;
  type: string;
  name: string;
  description?: string;
  priority?: string;
  status?: string;
  createdAt?: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type'); // Optional type filter

  // Flatten and normalize all mock data into a searchable format
  const allSearchableItems: SearchableItem[] = [
    ...MOCK_CLINIC_LOCATIONS.map((item) => ({
      id: item.id,
      type: 'clinic-location',
      name: item.name,
      description: item.address,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...MOCK_CLIENTS.map((item) => ({
      id: item.id,
      type: 'client',
      name: `${item.firstName} ${item.lastName}`,
      description: item.email || item.phone,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...MOCK_INTAKE_RECORDS.map((item) => ({
      id: item.id,
      type: 'intake-record',
      name: item.clientNameRaw,
      description: item.initialNotes,
      priority: item.priority,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...MOCK_FOLLOW_UP_TASKS.map((item) => ({
      id: item.id,
      type: 'follow-up-task',
      name: item.title,
      description: item.description,
      priority: item.priority,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...MOCK_REPORTS.map((item) => ({
      id: item.id,
      type: 'report',
      name: item.title,
      description: item.period,
      createdAt: item.generatedAt,
    })),
  ];

  let results: SearchableItem[] = [];

  if (!query) {
    // If query is empty, return first 5 items
    results = allSearchableItems.slice(0, 5);
  } else {
    const lowerCaseQuery = query.toLowerCase();
    const filteredByType = typeFilter
      ? allSearchableItems.filter((item) => item.type === typeFilter)
      : allSearchableItems;

    results = filteredByType.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerCaseQuery)) ||
        (item.status && item.status.toLowerCase().includes(lowerCaseQuery)) ||
        (item.priority && item.priority.toLowerCase().includes(lowerCaseQuery)),
    );
  }

  // Limit to max 20 results
  const limitedResults = results.slice(0, 20);

  return NextResponse.json({
    ok: true,
    data: {
      results: limitedResults,
      total: limitedResults.length,
      query: query,
    },
  });
}