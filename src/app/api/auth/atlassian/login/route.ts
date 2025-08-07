import { NextRequest, NextResponse } from 'next/server';
import { atlassianAuth } from '@/lib/auth/atlassian';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  
  try {
    // Generate a random state for CSRF protection
    const state = crypto.randomBytes(16).toString('hex');
    
    // Store state in a secure HTTP-only cookie
    const response = NextResponse.redirect(
      atlassianAuth.getAuthorizationUrl(state)
    );
    
    response.cookies.set('atlassian_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Atlassian login error:', error);
    return NextResponse.redirect(`${baseUrl}/auth/error?message=Failed to initiate Atlassian login`);
  }
}