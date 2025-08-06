# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Integrated QA AI Dashboard Platform** for Genesys QA teams. It's a Next.js 15.4.5 application with React 19.1.0 using the App Router, TypeScript with strict mode, and Tailwind CSS 4.

**Key Purpose**: Unified platform combining AI-driven tools with company systems (Confluence, Jira, Zoom) to streamline QA workflows through secure Genesys Cloud authentication.

## Essential Commands

```bash
# Development
npm run dev           # Start development server with Turbopack on http://localhost:3000

# Build & Production
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint checks
npm run type-check   # TypeScript type checking
```

**Note**: No test commands are currently configured. When implementing tests, use Vitest with React Testing Library following testing best practices.

## Architecture & Key Technologies

### Frontend Stack

- **Framework**: Next.js 15.4.5 (App Router) + React 19.1.0
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with custom design system
- **UI Components**: AWS Amplify UI + Custom Tailwind components
- **State Management**: React Query (TanStack Query) + Zustand
- **Icons**: Heroicons + Lucide React

### Backend & Infrastructure

- **Serverless**: AWS SAM (Lambda functions)
- **API**: Next.js API routes + AWS API Gateway
- **Hosting**: AWS Amplify
- **AI Service**: Amazon Bedrock (Claude 3 Sonnet)
- **Authentication**: Genesys Cloud Implicit Grant OAuth 2.0

### External Integrations

1. **Atlassian Remote MCP Server**: Jira/Confluence access
2. **Zoom API**: Meeting data and transcript analysis
3. **Brave Search MCP**: Web searches for research and information gathering
4. **AWS Services**: Bedrock, Secrets Manager, CloudWatch

### Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (dashboard)/     # Grouped routes for authenticated users
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── layout/         # Layout components (header, sidebar, etc.)
│   ├── features/       # Feature-specific components
│   └── common/         # Shared components
├── lib/                # Utilities and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

### Path Aliases

- `@/*` maps to `./src/*`
- Use for all imports: `import { Component } from '@/components/ui/button'`

## Implementation Requirements (Based on PRD)

### Authentication System

**Must implement Genesys Cloud Implicit Grant OAuth 2.0**:

```typescript
// Example auth flow structure
interface AuthConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
  authEndpoint: string;
}

// Required token handling
interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
```

### AI Integration Requirements

**Amazon Bedrock with Claude 3 Sonnet**:

- Implement streaming responses for real-time chat
- Context-aware prompts with epic/meeting/document context
- Template prompt system for common QA tasks
- Rate limiting (5 prompts/minute per user)

### MCP Integrations

**Atlassian Remote MCP Server**:

- OAuth 2.0 authentication for Jira/Confluence
- Real-time data fetching and ticket creation
- Permission-aware content access

**Brave Search MCP**:

- Integrate for web research capabilities
- Use for AI-enhanced information gathering
- Support queries like "latest testing best practices" or "QA automation trends"
- Cache results to avoid redundant searches

### Required Environment Variables

```bash
# Genesys Authentication
NEXT_PUBLIC_GENESYS_CLIENT_ID=
NEXT_PUBLIC_GENESYS_REDIRECT_URI=
NEXT_PUBLIC_GENESYS_AUTH_ENDPOINT=

# Atlassian Integration
ATLASSIAN_CLIENT_ID=
ATLASSIAN_CLIENT_SECRET=
ATLASSIAN_REDIRECT_URI=

# Zoom Integration
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=

# AWS Services
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# MCP Configurations
MCP_SERVER_URL=
BRAVE_SEARCH_API_KEY=
```

## Development Guidelines

### Component Creation Patterns

**Follow these established patterns**:

```typescript
// Base UI Component Example
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        {
          "bg-blue-600 hover:bg-blue-700 text-white": variant === "primary",
          "bg-gray-100 hover:bg-gray-200 text-gray-900":
            variant === "secondary",
          "hover:bg-gray-100 text-gray-700": variant === "ghost",
        },
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        }
      )}
      {...props}
    />
  );
}
```

### Tailwind CSS Best Practices

- Use design system classes consistently
- Implement responsive design: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode: Use CSS variables defined in globals.css
- Component variants: Use `clsx` or `cn` utility for conditional classes

### API Route Structure

```typescript
// src/app/api/ai/prompt/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const user = await validateAuth(request);

    const { prompt, context } = await request.json();

    // Process with Bedrock
    const response = await invokeBedrock(prompt, context);

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process prompt" },
      { status: 500 }
    );
  }
}
```

### State Management Patterns

**Use React Query for server state**:

```typescript
// Custom hook example
export function useEpicData(epicId: string) {
  return useQuery({
    queryKey: ["epic", epicId],
    queryFn: () => fetchEpicData(epicId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

**Use Zustand for client state**:

```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  login: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
```

### Web Search Integration (Brave Search MCP)

**Implement search capabilities**:

```typescript
// Example search integration
interface SearchQuery {
  query: string;
  context?: "qa" | "testing" | "automation";
  maxResults?: number;
}

export async function performWebSearch(searchQuery: SearchQuery) {
  // Use Brave Search MCP
  const results = await braveSearchMCP.search({
    q: searchQuery.query,
    count: searchQuery.maxResults || 5,
  });

  return results;
}
```

### Security Implementation

- **Never expose secrets**: All API keys in environment variables only
- **Validate inputs**: Use Zod for runtime validation
- **CORS policies**: Implement proper origin checking
- **Token management**: Secure storage with httpOnly cookies for sensitive data
- **Rate limiting**: Implement per-user rate limits

## Feature Implementation Priority

### Phase 1: Foundation (Weeks 1-2)

1. **Authentication system** with Genesys OAuth
2. **Basic layout** components (Header, Sidebar, Layout)
3. **Dashboard home** with placeholder widgets
4. **API routes** for auth and basic data

### Phase 2: Core Features (Weeks 3-4)

1. **AI chat interface** with Bedrock integration
2. **Epic management** views with Atlassian MCP
3. **Test case generation** and results display
4. **Web search integration** with Brave Search MCP

### Phase 3: Advanced Features (Weeks 5-6)

1. **Zoom integration** for meetings and transcripts
2. **Advanced AI features** (meeting analysis, impact assessment)
3. **Management dashboards** and analytics
4. **Real-time notifications**

## Important Development Notes

### When Working with MCP

- **Atlassian MCP**: Use for real-time Jira/Confluence data
- **Brave Search MCP**: Integrate for research capabilities
- Always handle MCP connection failures gracefully
- Implement retry mechanisms for failed requests

### AI Integration Best Practices

- Stream responses for better UX
- Implement context awareness (epic, user, meeting context)
- Use prompt templates for consistency
- Handle rate limits and token limits

### Performance Considerations

- Use React Server Components where possible
- Implement proper caching strategies
- Optimize Tailwind bundle size
- Lazy load heavy components

### Testing Strategy

- Unit tests: Vitest + React Testing Library
- Integration tests: Test API routes and MCP integrations
- E2E tests: Playwright for critical user flows
- AI testing: Mock Bedrock responses for consistent tests

## Current Implementation Status

- **Initial Setup**: ✅ Next.js template with Tailwind CSS 4
- **Authentication**: ❌ Not implemented
- **Dashboard Components**: ❌ Not created
- **API Routes**: ❌ None exist
- **MCP Integrations**: ❌ Not configured
- **AI Features**: ❌ Bedrock not integrated

## Deployment & Infrastructure

- **Frontend**: AWS Amplify (handles CI/CD)
- **Backend**: AWS SAM for Lambda functions
- **Environment**: Use AWS Systems Manager for production secrets
- **Monitoring**: CloudWatch for logs and metrics

---

**Always remember**:

- Use TypeScript strictly - no `any` types
- Implement proper error boundaries
- Follow accessibility standards (WCAG 2.1 AA)
- Test integrations thoroughly before committing
- Ask before making significant architectural changes
