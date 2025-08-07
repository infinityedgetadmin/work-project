# Setting Up Atlassian OAuth for Confluence Integration

## Step-by-Step Setup Guide

### 1. Create an OAuth 2.0 App in Atlassian

1. **Go to Atlassian Developer Console**
   - Navigate to: https://developer.atlassian.com/console/myapps/
   - Log in with your Atlassian account

2. **Create New App**
   - Click **"Create"** button
   - Select **"OAuth 2.0 integration"**
   - Fill in the app details:
     - **App name**: `QA Dashboard` (or your preferred name)
     - **App description**: `QA Dashboard Confluence Integration`
     - **Company name**: Your company name
     - **Company URL**: Your company website

3. **Configure Authorization Settings**
   - In your app settings, go to **"Authorization"** tab
   - Under **"OAuth 2.0 (3LO)"**, add your callback URL:
   
   For local development:
   ```
   http://localhost:3000/api/auth/atlassian/callback
   ```
   
   **CRITICAL**: The URL must be EXACTLY as shown above:
   - Include `http://` (not https for localhost)
   - Include port `:3000`
   - Path must be exactly `/api/auth/atlassian/callback`
   - NO trailing slash

4. **Configure Permissions (Scopes)**
   - Go to **"Permissions"** tab
   - Add the following Confluence scopes:
     - Click **"Add"** → **"Confluence API"**
     - Select these scopes:
       - `read:confluence-content.all`
       - `write:confluence-content`
       - `read:confluence-space.summary`
       - `read:confluence-props`
       - `read:confluence-content.summary`
       - `search:confluence`
   - Click **"Save"**

5. **Get Your Credentials**
   - Go to **"Settings"** tab
   - Copy your:
     - **Client ID**: (looks like: `1234567890abcdef...`)
     - **Secret**: Click "Reveal" and copy (looks like: `ATOAxxx...`)

### 2. Configure Your Application

1. **Create `.env.local` file** in your project root:
   ```bash
   # Create the file if it doesn't exist
   touch .env.local
   ```

2. **Add your credentials** to `.env.local`:
   ```env
   # Atlassian OAuth Configuration
   ATLASSIAN_CLIENT_ID=your-client-id-here
   ATLASSIAN_CLIENT_SECRET=your-secret-here
   ATLASSIAN_REDIRECT_URI=http://localhost:3000/api/auth/atlassian/callback
   
   # JWT Secret for session management (generate a random 32+ character string)
   JWT_SECRET=generate-a-secure-random-string-at-least-32-chars
   
   # Optional: MCP Server URL (leave default)
   ATLASSIAN_MCP_SERVER_URL=wss://mcp.atlassian.com
   ```

3. **Generate a secure JWT secret**:
   ```bash
   # On macOS/Linux:
   openssl rand -base64 32
   
   # Or use Node.js:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

### 3. Test the Authentication Flow

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Initiate OAuth flow**:
   - Open your browser
   - Navigate to: http://localhost:3000/api/auth/atlassian/login
   - You'll be redirected to Atlassian login

3. **Authorize the app**:
   - Log in with your Atlassian account
   - Review the permissions requested
   - Click **"Accept"** to grant access

4. **Verify success**:
   - You should be redirected back to http://localhost:3000
   - Check browser cookies for `atlassian_session` cookie

### 4. Using the Integration

1. **Navigate to AI Assistant**:
   - Go to the AI Assistant page in your app
   - Click **"Add Confluence Context"** button

2. **Search for pages**:
   - Enter search terms
   - Select a space (optional)
   - Click on pages to add them as context

3. **Use with AI**:
   - Selected pages will be used as context
   - AI responses will reference the content

### 5. Troubleshooting

#### Error: "redirect_uri is not registered for client"
- **Solution**: Ensure the callback URL in Atlassian console EXACTLY matches:
  ```
  http://localhost:3000/api/auth/atlassian/callback
  ```
- Common mistakes:
  - Using `https://` instead of `http://`
  - Missing port `:3000`
  - Typo in the path
  - Trailing slash at the end

#### Error: "unauthorized_client"
- **Solution**: Check that your Client ID and Secret are correct in `.env.local`
- Verify the app is not in "Disabled" state in Atlassian console

#### Error: "Failed to search Confluence"
- **Solution**: 
  1. Re-authenticate: http://localhost:3000/api/auth/atlassian/login
  2. Check you have access to at least one Confluence space
  3. Verify all required scopes are configured

#### No search results
- **Solution**:
  1. Verify you have Confluence access in your Atlassian account
  2. Check that Confluence spaces exist and you have read permissions
  3. Try searching without space filter first

### 6. Production Deployment

When deploying to production:

1. **Add production callback URL** in Atlassian console:
   ```
   https://your-domain.com/api/auth/atlassian/callback
   ```

2. **Update production environment variables**:
   ```env
   ATLASSIAN_CLIENT_ID=your-client-id
   ATLASSIAN_CLIENT_SECRET=your-secret
   ATLASSIAN_REDIRECT_URI=https://your-domain.com/api/auth/atlassian/callback
   JWT_SECRET=your-production-jwt-secret
   ```

3. **Security considerations**:
   - Use HTTPS in production
   - Store secrets in secure environment variable service
   - Implement rate limiting
   - Add CORS restrictions

### 7. API Endpoints Available

Once configured, these endpoints are available:

- `GET /api/auth/atlassian/login` - Start OAuth flow
- `GET /api/auth/atlassian/callback` - OAuth callback (automatic)
- `GET /api/auth/atlassian/status` - Check auth status
- `POST /api/confluence/search` - Search Confluence pages
- `GET /api/confluence/pages/:id` - Get specific page
- `GET /api/confluence/spaces` - List available spaces

### 8. Important Notes

- **Token expiry**: Access tokens expire after 1 hour
- **Refresh tokens**: Automatically used when available
- **Session duration**: User sessions last 7 days
- **Rate limits**: Atlassian APIs have rate limits - implement caching

### Need Help?

1. Check Atlassian OAuth documentation: https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/
2. Review error messages in browser console
3. Check server logs for detailed error information
4. Verify your Atlassian account has Confluence access