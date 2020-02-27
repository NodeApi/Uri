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

  /**
   * Create empty [[Query]] or parse from a string.
   *
   * @param str uri string to be parsed
   */
  constructor(str: string = '') {
    const params = new URLSearchParams(str);
    Array.from(params.entries()).forEach(([key, value]) => {
      this.append(key, value);
    });
  }

  /**
   * Create new [[Query]] object from 2 queries.
   *
   * ```typescript
   * const q1 = new Query('k1=val1&k2=val2');
   * const q2 = new Query('k3=val3&k1=val5');
   * const query = Query.merge(q1, q2);
   * query.toString(); // ?k1=val1&k2=val2&k3=val3&k1=val5'
   * ```
   * @param query1 first query
   * @param query2 second query
   */
  public static merge(query1: Query, query2: Query): Query {
    const query = new Query();
    [...query1.getAll(), ...query2.getAll()].forEach(param => {
      query.append(param.key, param.value);
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
   * Delete all params.
   *
   * The query will be empty.
   */
  public clear(): void {
    this.params = [];
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
