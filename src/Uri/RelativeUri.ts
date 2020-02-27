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
   * Create empty relative uri
   */
  constructor() {
    // TODO
  }

  /**
   * Parse a relative uri string.
   *
   * @param uri uri string to be parsed
   */
  public static parse(uri: string): RelativeUri {
    const nativeUrl = url.parse(uri);
    const relativeUri = new RelativeUri();

    relativeUri.path = nativeUrl.pathname || '';
    relativeUri.query = Query.parse(nativeUrl.search || '');
    relativeUri.fragment = nativeUrl.hash;

    return relativeUri;
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
  public get path(): string {
    return this._path;
  }
  public set path(value: string) {
    const trimmed = trim(value, '/');
    const path = !trimmed.length ? '/' : `/${trimmed}/`;
    this.validatePath(path);
    this._path = path;
  }

  public query: Query = new Query();

  private _fragment: string | null = null;
  public get fragment(): string | null {
    return this._fragment;
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
