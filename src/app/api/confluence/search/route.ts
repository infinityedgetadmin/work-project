import { NextRequest, NextResponse } from 'next/server';
import { createConfluenceMCPClient } from '@/services/mcp/confluence-client';
import { atlassianAuth } from '@/lib/auth/atlassian';
import { z } from 'zod';

const SearchRequestSchema = z.object({
  query: z.string().min(1),
  spaceKey: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  start: z.number().min(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get session token
    const sessionToken = request.cookies.get('atlassian_session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify and decode session
    const session = await atlassianAuth.verifySessionToken(sessionToken);
    const atlassianData = session.atlassian as {
      access_token: string;
      refresh_token?: string;
      expires_at: number;
    };

    // Check if token is expired
    if (atlassianData.expires_at < Date.now()) {
      // Try to refresh the token
      if (atlassianData.refresh_token) {
        const newTokens = await atlassianAuth.refreshAccessToken(atlassianData.refresh_token);
        // Update session with new tokens (in production, update the cookie)
        atlassianData.access_token = newTokens.access_token;
        atlassianData.expires_at = Date.now() + (newTokens.expires_in * 1000);
      } else {
        return NextResponse.json({ error: 'Token expired' }, { status: 401 });
      }
    }

    // Get cloud ID
    const cloudId = request.cookies.get('atlassian_cloud_id')?.value;
    if (!cloudId) {
      return NextResponse.json({ error: 'Cloud ID not found' }, { status: 400 });
    }

    // Validate request body
    const body = await request.json();
    const validatedData = SearchRequestSchema.parse(body);

    // Create MCP client and search
    const mcpClient = await createConfluenceMCPClient(
      atlassianData.access_token,
      cloudId
    );

    const results = await mcpClient.searchPages(validatedData.query, {
      spaceKey: validatedData.spaceKey,
      limit: validatedData.limit,
      start: validatedData.start,
    });

    // Disconnect client
    await mcpClient.disconnect();

    return NextResponse.json(results);
  } catch (error) {
    console.error('Confluence search error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to search Confluence' },
      { status: 500 }
    );
  }
}