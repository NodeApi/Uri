import { IQueryParam } from './QueryParam';
import { URLSearchParams } from 'url';

// https://en.wikipedia.org/wiki/Query_string

export class Query {

  private params: IQueryParam[] = [];

  constructor() {
    // TODO
  }

  public static parse(str: string): Query {
    const query = new Query();
    const params = new URLSearchParams(str);
    Array.from(params.entries()).forEach(([key, value]) => {
      query.append(key, value);
    });
    return query;
  }

  public append(key: string, value: string): void {
    this.params.push({ key, value });
  }

  public set(key: string, value: string): void {
    this.delete(key);
    this.append(key, value);
  }

  public keys(): string[] {
    const keys = this.params.map(param => param.key);
    const uniqKeys = Array.from(new Set(keys));
    return uniqKeys;
  }

  public get(key: string): IQueryParam[] {
    return this.params.filter(param => param.key.toLowerCase() === key.toLowerCase());
  }

  public getValue(key: string): string {
    const params = this.get(key);
    const values = params.map(param => param.value);
    return values.join(',');
  }

  public getAll(): IQueryParam[] {
    return this.params;
  }

  public delete(key: string): void {
    this.params = this.params.filter(param => param.key.toLowerCase() !== key.toLowerCase());
  }

  public toString() {
    if (!this.params.length) {
      return '';
    }

    const joinedParams = this.params.map(param => `${param.key}=${param.value}`).join('&');
    return encodeURI(`?${joinedParams}`);
  }
}
