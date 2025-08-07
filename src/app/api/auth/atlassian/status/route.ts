import { NextRequest, NextResponse } from 'next/server';
import { atlassianAuth } from '@/lib/auth/atlassian';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('atlassian_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ 
        authenticated: false,
        user: null 
      });
    }

    const session = await atlassianAuth.verifySessionToken(sessionToken);
    const atlassianData = session.atlassian as {
      access_token: string;
      refresh_token?: string;
      expires_at: number;
    };
    
    // Check if token is expired
    const isExpired = atlassianData.expires_at < Date.now();
    
    if (isExpired && !atlassianData.refresh_token) {
      return NextResponse.json({ 
        authenticated: false,
        user: null,
        reason: 'Token expired' 
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: session.user,
      expiresAt: atlassianData.expires_at,
      needsRefresh: isExpired
    });
  } catch (error) {
    console.error('Auth status check error:', error);
    return NextResponse.json({ 
      authenticated: false,
      user: null,
      error: 'Invalid session' 
    });
  }
}