import { NextRequest, NextResponse } from 'next/server';
import { createConfluenceMCPClient } from '@/services/mcp/confluence-client';
import { atlassianAuth } from '@/lib/auth/atlassian';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

    // Create MCP client and get page
    const mcpClient = await createConfluenceMCPClient(
      atlassianData.access_token,
      cloudId
    );

    const page = await mcpClient.getPage(params.id, [
      'body.storage',
      'body.view',
      'space',
      'version',
      'ancestors',
    ]);

    // Convert storage format to plain text if needed
    if (page.body?.storage?.value) {
      const plainText = await mcpClient.convertToPlainText(page.body.storage.value);
      page.body.plainText = plainText;
    }

    // Disconnect client
    await mcpClient.disconnect();

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching Confluence page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Confluence page' },
      { status: 500 }
    );
  }
}