import url from 'url';
import { Scheme } from './Scheme';
import { isEnum } from '../temp/isKeyOfEnum';
import { trimEnd, trim, trimStart } from '../temp/trimEnd';
import { LibError } from '../temp/LibError';
import { Query } from '../Query/Query';

// https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

/**
 * Simple Uri abstraction based on https://en.wikipedia.org/wiki/Uniform_Resource_Identifier.
 *
 * It is a wrapper over the outdated and non-intuitive Node.js URL.
 */
export class RelativeUri {

  /**
   * Parse uri and retain relative part
   * @param uri absolute or relative uri string to be parsed
   */
  constructor(uri: string = '') {
    const nativeUrl = url.parse(uri);

    this.path = nativeUrl.pathname || '';
    this.query = new Query(nativeUrl.search || '');
    this.fragment = nativeUrl.hash;
  }

  /**
   * Get a relative uri string.
   */
  public get relativeUri(): string {
    const fragment = this.fragment ? `#${this.fragment}` : '';
    return `${this.path}${this.query.toString()}${fragment}`;
  }

  /**
   * Create a relative uri string like [[absoluteUri]]
   */
  public toString(): string {
    return this.relativeUri;
  }

  private _path: string = '/';
  /**
   * Path part of the uri.
   */
  public get path(): string {
    return this._path;
  }
  public set path(value: string) {
    const trimmed = trim(value, '/');
    const path = !trimmed.length ? '/' : `/${trimmed}/`;
    this.validatePath(path);
    this._path = path;
  }

  /**
   * Query part of the uri.
   */
  public query: Query = new Query();

  private _fragment: string | null = null;
  /**
   * Fragment part of the uri (url encoded).
   *
   * ```typescript
   * const uri = new Uri('http://fakedomain.com/path');
   * uri.fragment = 'test';
   * uri.toString(); // http://fakedomain.com/path/#test
   * // or
   * uri.fragment = '#test';
   * uri.toString(); // http://fakedomain.com/path/#test
   * ```
   */
  public get fragment(): string | null {
    return this._fragment ? encodeURI(this._fragment) : null;
  }
  public set fragment(value: string | null) {
    this._fragment = value === null ? null : trimStart(value, '#');
  }

  protected validatePath(path: string | null): asserts path is string {
    if (!path) {
      throw new LibError('Path cannot be empty', path);
    }
  }
}
