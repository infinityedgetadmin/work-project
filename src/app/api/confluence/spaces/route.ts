import { NextRequest, NextResponse } from 'next/server';
import { createConfluenceMCPClient } from '@/services/mcp/confluence-client';
import { atlassianAuth } from '@/lib/auth/atlassian';

export async function GET(request: NextRequest) {
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

    // Get cloud ID
    const cloudId = request.cookies.get('atlassian_cloud_id')?.value;
    if (!cloudId) {
      return NextResponse.json({ error: 'Cloud ID not found' }, { status: 400 });
    }

    // Create MCP client and get spaces
    const mcpClient = await createConfluenceMCPClient(
      atlassianData.access_token,
      cloudId
    );

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '25');

    const spaces = await mcpClient.getSpaces(limit);

    // Disconnect client
    await mcpClient.disconnect();

    return NextResponse.json(spaces);
  } catch (error) {
    console.error('Error fetching Confluence spaces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Confluence spaces' },
      { status: 500 }
    );
  }
}