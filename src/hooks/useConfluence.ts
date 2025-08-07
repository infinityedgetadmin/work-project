import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ConfluencePage, ConfluenceSearchResult } from '@/services/mcp/confluence-client';

interface SearchParams {
  query: string;
  spaceKey?: string;
  limit?: number;
  start?: number;
}

interface CreatePageParams {
  spaceKey: string;
  title: string;
  content: string;
  parentId?: string;
}

interface UpdatePageParams {
  pageId: string;
  title: string;
  content: string;
  version: number;
}

/**
 * Hook to search Confluence pages
 */
export function useConfluenceSearch(
  params: SearchParams,
  options?: Omit<UseQueryOptions<ConfluenceSearchResult>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['confluence', 'search', params],
    queryFn: async () => {
      const response = await fetch('/api/confluence/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to search Confluence');
      }

      return response.json() as Promise<ConfluenceSearchResult>;
    },
    enabled: !!params.query && params.query.length > 0,
    staleTime: 30000, // 30 seconds
    ...options,
  });
}

/**
 * Hook to get a specific Confluence page
 */
export function useConfluencePage(
  pageId: string,
  options?: Omit<UseQueryOptions<ConfluencePage>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['confluence', 'page', pageId],
    queryFn: async () => {
      const response = await fetch(`/api/confluence/pages/${pageId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch page');
      }

      return response.json() as Promise<ConfluencePage>;
    },
    enabled: !!pageId,
    staleTime: 60000, // 1 minute
    ...options,
  });
}

/**
 * Hook to get Confluence spaces
 */
export function useConfluenceSpaces(limit: number = 25) {
  return useQuery({
    queryKey: ['confluence', 'spaces', limit],
    queryFn: async () => {
      const response = await fetch(`/api/confluence/spaces?limit=${limit}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch spaces');
      }

      return response.json();
    },
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to create a new Confluence page
 */
export function useCreateConfluencePage(
  options?: UseMutationOptions<ConfluencePage, Error, CreatePageParams>
) {
  return useMutation({
    mutationFn: async (params: CreatePageParams) => {
      const response = await fetch('/api/confluence/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create page');
      }

      return response.json() as Promise<ConfluencePage>;
    },
    ...options,
  });
}

/**
 * Hook to update a Confluence page
 */
export function useUpdateConfluencePage(
  options?: UseMutationOptions<ConfluencePage, Error, UpdatePageParams>
) {
  return useMutation({
    mutationFn: async ({ pageId, ...params }: UpdatePageParams) => {
      const response = await fetch(`/api/confluence/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update page');
      }

      return response.json() as Promise<ConfluencePage>;
    },
    ...options,
  });
}

/**
 * Hook to check Atlassian authentication status
 */
export function useAtlassianAuth() {
  return useQuery({
    queryKey: ['atlassian', 'auth'],
    queryFn: async () => {
      const response = await fetch('/api/auth/atlassian/status');
      
      if (!response.ok) {
        return { authenticated: false };
      }

      return response.json();
    },
    staleTime: 60000, // 1 minute
  });
}