import { IQueryParam } from './QueryParam';
import { URLSearchParams } from 'url';

// https://en.wikipedia.org/wiki/Query_string

/**
 * Simple Query abstraction.
 *
 * It is a wrapper over the outdated and non-intuitive Node.js URLSearchParams.
 */
export class Query {

  private params: IQueryParam[] = [];

  constructor() {
    // TODO
  }

  /**
   * Create [[Query]] from a string.
   *
   * @param str uri string to be parsed
   */
  public static parse(str: string): Query {
    const query = new Query();
    const params = new URLSearchParams(str);
    Array.from(params.entries()).forEach(([key, value]) => {
      query.append(key, value);
    });
    return query;
  }

  /**
   * Append a new param to the query.
   *
   * The difference between [[set]] is that [[append]]
   * doesn't override existing values associated with given key.
   *
   * ```typescript
   * const query = new Query();
   * query.append('tag', 'value1');
   * query.append('tag', 'value2');
   * query.getValue('tag'); // 'value1,value2'
   * ```
   *
   * @param key key of the param
   * @param value value of the param
   */
  public append(key: string, value: string): void {
    this.params.push({ key, value });
  }

  /**
   * Set a new param in the query.
   *
   * The difference between [[append]] is that [[set]]
   * overrides existing values associated with given key.
   *
   * ```typescript
   * const query = new Query();
   * query.set('tag', 'value1');
   * query.set('tag', 'value2');
   * query.getValue('tag'); // 'value2'
   * ```
   *
   * @param key key of the param
   * @param value value of the param
   */
  public set(key: string, value: string): void {
    this.delete(key);
    this.append(key, value);
  }

  /**
   * Get all param keys (with no duplicates).
   */
  public keys(): string[] {
    const keys = this.params.map(param => param.key);
    const uniqKeys = Array.from(new Set(keys));
    return uniqKeys;
  }

  /**
   * Get [[IQueryParam]] key-value pairs by key.
   * @param key key of the param
   */
  public get(key: string): IQueryParam[] {
    return this.params.filter(param => param.key.toLowerCase() === key.toLowerCase());
  }

  /**
   * Get param values joined by a ',' filtered by key.
   *
   * ```typescript
   * const query = new Query();
   * query.set('key1', 'value1');
   * query.set('key1', 'value2');
   * query.getValue('key1'); // 'value1,value2'
   * ```
   * @param key key of the param
   */
  public getValue(key: string): string {
    const params = this.get(key);
    const values = params.map(param => param.value);
    return values.join(',');
  }

  /**
   * Get all query params.
   */
  public getAll(): IQueryParam[] {
    return this.params;
  }

  /**
   * Delete all values associated with given key
   * @param key key of the param
   */
  public delete(key: string): void {
    this.params = this.params.filter(param => param.key.toLowerCase() !== key.toLowerCase());
  }

  /**
   * Get urlEncoded query string
   *
   * ```typescript
   * const query = new Query();
   * query.set('key1', 'value1');
   * query.set('key>2', 'value>2');
   * query.toString(); // '?key1=value1&key%3E2=value%3E2'
   * ```
   */
  public toString() {
    if (!this.params.length) {
      return '';
    }

    const joinedParams = this.params.map(param => `${param.key}=${param.value}`).join('&');
    return encodeURI(`?${joinedParams}`);
  }
}
