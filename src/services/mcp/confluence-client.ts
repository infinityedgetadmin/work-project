import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { z } from 'zod';

// Schema definitions for Confluence data
const ConfluencePageSchema = z.object({
  id: z.string(),
  type: z.string(),
  status: z.string(),
  title: z.string(),
  space: z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
  }).optional(),
  version: z.object({
    number: z.number(),
    createdAt: z.string(),
  }).optional(),
  body: z.object({
    storage: z.object({
      value: z.string(),
      representation: z.string(),
    }).optional(),
    view: z.object({
      value: z.string(),
      representation: z.string(),
    }).optional(),
    plainText: z.string().optional(),
  }).optional(),
  _links: z.object({
    self: z.string(),
    webui: z.string(),
  }).optional(),
});

const ConfluenceSearchResultSchema = z.object({
  results: z.array(ConfluencePageSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  totalSize: z.number().optional(),
});

export type ConfluencePage = z.infer<typeof ConfluencePageSchema>;
export type ConfluenceSearchResult = z.infer<typeof ConfluenceSearchResultSchema>;

interface ConfluenceMCPConfig {
  accessToken: string;
  cloudId: string;
  serverUrl?: string;
}

export class ConfluenceMCPClient {
  private client: Client;
  private config: ConfluenceMCPConfig;
  private connected: boolean = false;

  constructor(config: ConfluenceMCPConfig) {
    this.config = config;
    this.client = new Client({
      name: 'qa-dashboard-confluence-client',
      version: '1.0.0',
    });
  }

  /**
   * Connect to the Atlassian Remote MCP Server
   */
  async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    try {
      // Use stdio transport for MCP communication
      // In production, this would connect to the Atlassian Remote MCP server
      const transport = new StdioClientTransport({
        command: 'npx',
        args: ['-y', '@atlassian/mcp-server'],
        env: {
          ...process.env,
          ATLASSIAN_ACCESS_TOKEN: this.config.accessToken,
          ATLASSIAN_CLOUD_ID: this.config.cloudId,
        },
      });

      await this.client.connect(transport);
      this.connected = true;

      // List available tools to verify connection
      const tools = await this.client.listTools();
      console.log('Connected to Confluence MCP. Available tools:', tools.tools.map(t => t.name));
    } catch (error) {
      console.error('Failed to connect to Confluence MCP:', error);
      throw new Error('Failed to connect to Confluence MCP server');
    }
  }

  /**
   * Ensure connection before making calls
   */
  private async ensureConnected(): Promise<void> {
    if (!this.connected) {
      await this.connect();
    }
  }

  /**
   * Search for Confluence pages
   */
  async searchPages(
    query: string,
    options?: {
      spaceKey?: string;
      limit?: number;
      start?: number;
    }
  ): Promise<ConfluenceSearchResult> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_search',
        arguments: {
          cql: options?.spaceKey 
            ? `text ~ "${query}" AND space.key = "${options.spaceKey}"`
            : `text ~ "${query}"`,
          limit: options?.limit || 10,
          start: options?.start || 0,
        }
      });

      const resultContent = result.content as any[];
      return ConfluenceSearchResultSchema.parse(resultContent[0]);
    } catch (error) {
      console.error('Confluence search error:', error);
      throw new Error('Failed to search Confluence pages');
    }
  }

  /**
   * Get a specific Confluence page by ID
   */
  async getPage(pageId: string, expand?: string[]): Promise<ConfluencePage> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_get_page',
        arguments: {
          pageId,
          expand: expand?.join(',') || 'body.storage,space,version',
        }
      });

      const resultContent = result.content as any[];
      return ConfluencePageSchema.parse(resultContent[0]);
    } catch (error) {
      console.error('Error fetching Confluence page:', error);
      throw new Error('Failed to fetch Confluence page');
    }
  }

  /**
   * Create a new Confluence page
   */
  async createPage(
    spaceKey: string,
    title: string,
    content: string,
    parentId?: string
  ): Promise<ConfluencePage> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_create_page',
        arguments: {
          spaceKey,
          title,
          body: {
            storage: {
              value: content,
              representation: 'storage',
            },
          },
          ancestors: parentId ? [{ id: parentId }] : undefined,
        }
      });

      const resultContent = result.content as any[];
      return ConfluencePageSchema.parse(resultContent[0]);
    } catch (error) {
      console.error('Error creating Confluence page:', error);
      throw new Error('Failed to create Confluence page');
    }
  }

  /**
   * Update an existing Confluence page
   */
  async updatePage(
    pageId: string,
    title: string,
    content: string,
    version: number
  ): Promise<ConfluencePage> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_update_page',
        arguments: {
          pageId,
          title,
          body: {
            storage: {
              value: content,
              representation: 'storage',
            },
          },
          version: {
            number: version + 1,
          },
        }
      });

      const resultContent = result.content as any[];
      return ConfluencePageSchema.parse(resultContent[0]);
    } catch (error) {
      console.error('Error updating Confluence page:', error);
      throw new Error('Failed to update Confluence page');
    }
  }

  /**
   * Get all spaces accessible to the user
   */
  async getSpaces(limit: number = 25): Promise<any> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_get_spaces',
        arguments: {
          limit,
        }
      });

      const resultContent = result.content as any[];
      return resultContent[0];
    } catch (error) {
      console.error('Error fetching Confluence spaces:', error);
      throw new Error('Failed to fetch Confluence spaces');
    }
  }

  /**
   * Get child pages of a parent page
   */
  async getChildPages(parentId: string): Promise<ConfluenceSearchResult> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_get_child_pages',
        arguments: {
          parentId,
          expand: 'body.storage,space',
        }
      });

      const resultContent = result.content as any[];
      return ConfluenceSearchResultSchema.parse(resultContent[0]);
    } catch (error) {
      console.error('Error fetching child pages:', error);
      throw new Error('Failed to fetch child pages');
    }
  }

  /**
   * Convert Confluence storage format to plain text
   */
  async convertToPlainText(storageContent: string): Promise<string> {
    await this.ensureConnected();

    try {
      const result = await this.client.callTool({
        name: 'confluence_convert_content',
        arguments: {
          value: storageContent,
          fromFormat: 'storage',
          toFormat: 'plain',
        }
      });

      const resultContent = result.content as any[];
      return resultContent[0] as string;
    } catch (error) {
      console.error('Error converting content:', error);
      throw new Error('Failed to convert content');
    }
  }

  /**
   * Disconnect from the MCP server
   */
  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
    }
  }
}

/**
 * Factory function to create a Confluence MCP client
 */
export async function createConfluenceMCPClient(
  accessToken: string,
  cloudId: string
): Promise<ConfluenceMCPClient> {
  const client = new ConfluenceMCPClient({
    accessToken,
    cloudId,
    serverUrl: process.env.ATLASSIAN_MCP_SERVER_URL,
  });

  await client.connect();
  return client;
}