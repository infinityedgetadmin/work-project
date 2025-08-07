import { SignJWT, jwtVerify } from 'jose';

interface AtlassianTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface AtlassianUser {
  account_id: string;
  email: string;
  name: string;
  picture?: string;
}

export class AtlassianAuth {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private authBaseUrl = 'https://auth.atlassian.com';
  private apiBaseUrl = 'https://api.atlassian.com';

  constructor() {
    this.clientId = process.env.ATLASSIAN_CLIENT_ID!;
    this.clientSecret = process.env.ATLASSIAN_CLIENT_SECRET!;
    this.redirectUri = process.env.ATLASSIAN_REDIRECT_URI!;

    if (!this.clientId || !this.clientSecret || !this.redirectUri) {
      throw new Error('Missing Atlassian OAuth configuration');
    }
  }

  /**
   * Get the authorization URL for OAuth flow
   */
  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      audience: 'api.atlassian.com',
      client_id: this.clientId,
      scope: 'read:me read:confluence-content.all write:confluence-content read:confluence-space.summary read:confluence-props read:confluence-content.summary search:confluence offline_access',
      redirect_uri: this.redirectUri,
      state,
      response_type: 'code',
      prompt: 'consent'
    });

    return `${this.authBaseUrl}/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<AtlassianTokenResponse> {
    const response = await fetch(`${this.authBaseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Token exchange error:', {
        status: response.status,
        error: error
      });
      throw new Error(`Failed to exchange code for token: ${error}`);
    }

    const tokens = await response.json();
    console.log('Token exchange successful, received scopes:', tokens.scope);
    return tokens;
  }

  /**
   * Refresh an access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<AtlassianTokenResponse> {
    const response = await fetch(`${this.authBaseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to refresh token: ${error}`);
    }

    return response.json();
  }

  /**
   * Get user information from Atlassian
   */
  async getUserInfo(accessToken: string): Promise<AtlassianUser> {
    const response = await fetch(`${this.apiBaseUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('User info API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: `${this.apiBaseUrl}/me`
      });
      throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get accessible Confluence resources
   */
  async getAccessibleResources(accessToken: string) {
    const response = await fetch(`${this.apiBaseUrl}/oauth/token/accessible-resources`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch accessible resources');
    }

    return response.json();
  }

  /**
   * Create a session token for the user
   */
  async createSessionToken(user: AtlassianUser, tokens: AtlassianTokenResponse) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    const jwt = await new SignJWT({
      user,
      atlassian: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: Date.now() + (tokens.expires_in * 1000)
      }
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return jwt;
  }

  /**
   * Verify and decode session token
   */
  async verifySessionToken(token: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    try {
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch (error) {
      throw new Error('Invalid session token');
    }
  }
}

export const atlassianAuth = new AtlassianAuth();