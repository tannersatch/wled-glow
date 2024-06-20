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
    host: string;
    port?: number;
  }) {
    this.url = `${secure ? 'https' : 'http'}://${host}${port ? `:${port}` : ''}`;
    this.jsonApi = `${this.url}/json`;
    this.info = null as WLEDInfo | null;
  }

  async init() {
    await this.getInfo().catch(() => {
      this.isReady = false;
    });
    this.isReady = true;
  }

  // handleErrors(response: Response) {
  //   if (!response.ok) {
  //     this.emit('error', response);
  //     throw response;
  //   }
  //   return response;
  // }

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
    const response = await this.timedFetch('/info', {
      timeout,
    });
    const object = (await response.json()) as WLEDInfo;
    this.info = object;
    return object;
  }
}
