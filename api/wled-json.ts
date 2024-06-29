import to from 'await-to-js';
import { WLEDInfo } from './types.wled';

export type JSONAPIFetchOptions = {
  timeout?: number;
};

export default class WLED {
  private readonly jsonApi: string;

  private readonly url: string;

  public isReady = false;

  public info: WLEDInfo | null;

  constructor({
    secure = false,
    host,
    port = 80,
  }: {
    secure?: boolean;
    host: string | undefined;
    port?: number;
  }) {
    this.url = `${secure ? 'https' : 'http'}://${host}${port ? `:${port}` : ''}`;
    this.jsonApi = `${this.url}/json`;
    this.info = null as WLEDInfo | null;
  }

  async init() {
    try {
      await this.getInfo();
      this.isReady = true;
    } catch (error) {
      console.error(error);
      this.isReady = false;
    }
  }

  async timedFetch(
    path: string,
    options: Parameters<typeof fetch>[1] & { [key: string]: any } & {
      timeout?: number;
    } = {},
  ) {
    const { timeout = 5000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${this.jsonApi}${path}`, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    return response;
  }

  async getInfo(options: JSONAPIFetchOptions = {}) {
    const { timeout } = options;
    const [infoErr, response] = await to(
      this.timedFetch('/info', {
        timeout,
      }),
    );
    if (infoErr) {
      throw new Error('WLED: Failed to fetch info');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [parseErr, object] = (await to(response.json())) as [any, WLEDInfo];
    if (parseErr) {
      throw new Error('WLED: Failed to parse info');
    }
    this.info = object;
    return object;
  }
}
