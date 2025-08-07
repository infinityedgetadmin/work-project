import { NextRequest, NextResponse } from 'next/server';
import { atlassianAuth } from '@/lib/auth/atlassian';

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('Atlassian OAuth error:', error);
      return NextResponse.redirect(`${baseUrl}/auth/error?message=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${baseUrl}/auth/error?message=Missing authorization code or state`);
    }

    // Verify state to prevent CSRF attacks
    const storedState = request.cookies.get('atlassian_oauth_state')?.value;
    if (!storedState || storedState !== state) {
      return NextResponse.redirect(`${baseUrl}/auth/error?message=Invalid state parameter`);
    }

    // Exchange code for token
    const tokens = await atlassianAuth.exchangeCodeForToken(code);
    
    // Try to get user information (optional - may fail with some configurations)
    let user: any = { 
      account_id: 'unknown',
      email: 'unknown@atlassian.com',
      name: 'Atlassian User'
    };
    
    try {
      user = await atlassianAuth.getUserInfo(tokens.access_token);
      console.log('User info retrieved:', user);
    } catch (error) {
      console.warn('Could not fetch user info, using defaults:', error);
      // Continue with default user info - the important part is the access token
    }
    
    // Get accessible resources (Confluence sites)
    const resources = await atlassianAuth.getAccessibleResources(tokens.access_token);
    console.log('Accessible resources:', resources);
    
    // Create session token
    const sessionToken = await atlassianAuth.createSessionToken(user, tokens);
    
    // Create response with redirect to dashboard
    const response = NextResponse.redirect(`${baseUrl}/`);
    
    // Set session cookie
    response.cookies.set('atlassian_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    
    // Store cloud ID for Confluence API calls
    if (resources.length > 0) {
      response.cookies.set('atlassian_cloud_id', resources[0].id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });
    }
    
    // Clear OAuth state cookie
    response.cookies.delete('atlassian_oauth_state');

    return response;
  } catch (error) {
    console.error('Atlassian callback error:', error);
    return NextResponse.redirect(`${baseUrl}/auth/error?message=Authentication failed`);
  }
}