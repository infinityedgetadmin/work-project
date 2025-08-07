# Confluence MCP Integration Setup Guide

## Overview

This guide explains how to set up and use the Confluence MCP (Model Context Protocol) integration in the QA Dashboard. The integration allows users to search and access Confluence pages directly within the AI Assistant, providing context for more accurate and relevant AI responses.

## Architecture

The Confluence MCP integration uses:
- **Atlassian Remote MCP Server**: Hosted MCP server by Atlassian
- **OAuth 2.0 Authentication**: Secure authentication with Atlassian
- **WebSocket Transport**: Real-time communication with the MCP server
- **TypeScript MCP SDK**: Official SDK for MCP client implementation

## Prerequisites

1. Atlassian Cloud account with Confluence access
2. OAuth 2.0 app configured in Atlassian Developer Console
3. Environment variables configured

## Setup Steps

### 1. Create Atlassian OAuth App

1. Go to [Atlassian Developer Console](https://developer.atlassian.com/console/myapps/)
2. Click "Create" → "OAuth 2.0 integration"
3. Configure your app:
   - **App name**: QA Dashboard
   - **App description**: QA Dashboard Confluence Integration
   - **Company URL**: Your company URL
   - **Redirect URI**: `http://localhost:3000/api/auth/atlassian/callback`

4. Set required scopes:
   ```
   read:confluence-content.all
   write:confluence-content
   read:confluence-space.summary
   read:confluence-props
   read:confluence-content.summary
   search:confluence
   offline_access
   ```

5. Save your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Atlassian Integration
ATLASSIAN_CLIENT_ID=your-client-id-here
ATLASSIAN_CLIENT_SECRET=your-client-secret-here
ATLASSIAN_REDIRECT_URI=http://localhost:3000/api/auth/atlassian/callback
ATLASSIAN_MCP_SERVER_URL=wss://mcp.atlassian.com

# JWT Secret (generate a secure random string)
JWT_SECRET=your-secure-jwt-secret-minimum-32-characters
```

### 3. Authenticate with Atlassian

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/api/auth/atlassian/login`

3. You'll be redirected to Atlassian's OAuth consent page

4. Approve the requested permissions

5. You'll be redirected back to the dashboard with authentication complete

## Using Confluence Context in AI Assistant

### Adding Confluence Pages as Context

1. Open the AI Assistant page
2. In the Context Panel (right sidebar), click "Add Confluence Context"
3. Search for relevant Confluence pages
4. Select pages to add as context
5. Click "Done" to add selected pages

### How Context Works

When Confluence pages are added as context:
- The AI Assistant can reference the content of those pages
- Responses will be more accurate and specific to your documentation
- The AI can cite specific pages as sources
- Context is preserved throughout the conversation

### Example Use Cases

1. **Requirements Analysis**:
   - Add product requirement documents from Confluence
   - Ask the AI to generate test cases based on requirements

2. **Meeting Notes Context**:
   - Add meeting notes pages
   - Ask the AI to summarize decisions or action items

3. **Technical Documentation**:
   - Add API documentation pages
   - Ask the AI to generate test scripts for specific endpoints

## API Endpoints

### Authentication
- `GET /api/auth/atlassian/login` - Initiate OAuth flow
- `GET /api/auth/atlassian/callback` - OAuth callback handler
- `GET /api/auth/atlassian/status` - Check authentication status

### Confluence Operations
- `POST /api/confluence/search` - Search Confluence pages
- `GET /api/confluence/pages/:id` - Get specific page content
- `GET /api/confluence/spaces` - List available spaces

## MCP Tools Available

The Confluence MCP server provides these tools:
- `confluence_search` - Search pages using CQL
- `confluence_get_page` - Retrieve page content
- `confluence_create_page` - Create new pages
- `confluence_update_page` - Update existing pages
- `confluence_get_spaces` - List spaces
- `confluence_get_child_pages` - Get child pages
- `confluence_convert_content` - Convert between formats

## Troubleshooting

### Authentication Issues

If you encounter authentication errors:
1. Verify your OAuth app credentials
2. Check that all required scopes are configured
3. Clear cookies and re-authenticate
4. Ensure redirect URI matches exactly

### MCP Connection Issues

If the MCP server connection fails:
1. Check network connectivity
2. Verify WebSocket connections are not blocked
3. Check browser console for detailed error messages
4. Ensure the MCP server URL is correct

### Search Not Working

If Confluence search returns no results:
1. Verify you have access to the spaces
2. Check the search query syntax
3. Ensure the user has read permissions
4. Try searching without space filters first

## Security Considerations

1. **Token Storage**: Access tokens are stored in secure HTTP-only cookies
2. **Token Refresh**: Tokens are automatically refreshed when expired
3. **CSRF Protection**: State parameter validates OAuth callbacks
4. **Permissions**: Users can only access content they have permissions for
5. **Session Management**: Sessions expire after 7 days

## Development Tips

### Testing with Mock Data

For development without Atlassian access:
```typescript
// Use mock data in development
if (process.env.NODE_ENV === 'development' && !process.env.ATLASSIAN_CLIENT_ID) {
  return mockConfluenceData;
}
```

### Debugging MCP Connections

Enable debug logging:
```typescript
const client = new Client({
  name: 'qa-dashboard-confluence-client',
  version: '1.0.0',
  debug: true // Enable debug logging
});
```

### Rate Limiting

The Atlassian API has rate limits:
- Implement exponential backoff for retries
- Cache frequently accessed pages
- Use batch operations where possible

## Next Steps

1. Integrate with Jira using the same MCP server
2. Add support for creating Confluence pages from the AI Assistant
3. Implement page templates for common QA documentation
4. Add support for inline comments and annotations