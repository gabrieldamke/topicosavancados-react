import { Client } from "./ApiProvider";

export class EnhancedApiClient extends Client {
  private token: string;

  constructor(baseUrl?: string, token?: string) {
    super(baseUrl);
    this.token = token as string;
  }

  protected transformOptions(options: RequestInit): Promise<RequestInit> {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${this.token}`,
    };
    return Promise.resolve(options);
  }
}
