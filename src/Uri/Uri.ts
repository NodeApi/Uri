import url from 'url';
import { Scheme } from './Scheme';
import { isEnum } from '../temp/isKeyOfEnum';
import { trimEnd, trim, trimStart } from '../temp/trimEnd';
import { LibError } from '../temp/LibError';
import { Query } from '../Query/Query';
import { RelativeUri } from './RelativeUri';

// https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

/**
 * Simple Uri abstraction based on https://en.wikipedia.org/wiki/Uniform_Resource_Identifier.
 *
 * It is a wrapper over the outdated and non-intuitive Node.js URL.
 */
export class Uri extends RelativeUri {

  /**
   * [[Uri]] needs an absolute uri.
   *
   * @throws when uri is not a valid uri.
   * @param uri uri string to be parsed
   */
  constructor(uri: string) {
    super(uri);

    if (!uri) {
      throw new LibError('Uri can\'t be empty', uri);
    }
    const nativeUrl = url.parse(uri);

    const scheme = trimEnd(nativeUrl.protocol || '', ':');
    this.validateScheme(scheme);
    this._scheme = scheme;

    const auth = nativeUrl.auth;
    this.validateAuth(auth);
    this._auth = auth;

    const hostname = nativeUrl.hostname;
    this.validateHostname(hostname);
    this._hostname = hostname;

    this.port = nativeUrl.port === null ? null : Number(nativeUrl.port);
  }

  /**
   * Create new [[Uri]] object with joined path and query params.
   *
   * @warning The fragment is taken from the relativeUri!
   * ```typescript
   * const uri = new Uri('http://host.com/users?k1=v1#oldFragment');
   * const relativeUri = new RelativeUri('/15?k2=v2#newFragment');
   * const newUri = Uri.merge(uri, relativeUri);
   * newUri.toString(); // http://host.com/users/15/?k1=v1&k2=v2#newFragment
   * ```
   * @param uri absolute uri
   * @param relativeUri relative uri
   */
  public static merge(uri: Uri, relativeUri: RelativeUri): Uri {
    const newUri = new Uri(uri.toString());
    newUri.path = trimEnd(uri.path, '/') + relativeUri.path;
    newUri.query = Query.merge(uri.query, relativeUri.query);
    newUri.fragment = relativeUri.fragment;
    return newUri;
  }

  /**
   * Get a full uri string.
   */
  public get absoluteUri(): string {
    const auth = this.auth ? `${this.auth}@` : '';
    return `${this.scheme}://${auth}${this.host}${this.relativeUri}`;
  }

  /**
   * Create a full uri string like [[absoluteUri]]
   */
  public toString(): string {
    return this.absoluteUri;
  }

  private _scheme: Scheme = Scheme.Http;
  /**
   * Scheme part of the uri.
   */
  public get scheme(): Scheme {
    return this._scheme;
  }
  /**
   * @throws when setting incorrect scheme.
   */
  public set scheme(value: Scheme) {
    this.validateScheme(value);
    this._scheme = value;
  }

  private _auth: string | null = null;
  /**
   * Auth part of the uri.
   *
   * Can be 'username' or 'username:password'.
   */
  public get auth(): string | null {
    return this._auth;
  }
  /**
   * @throws when setting incorrect auth.
   */
  public set auth(value: string | null) {
    this.validateAuth(value);
    this._auth = value;
  }

  private _hostname: string = '';
  /**
   * Hostname part of the uri.
   */
  public get hostname(): string {
    return this._hostname;
  }
  /**
   * @throws when setting empty
   */
  public set hostname(value: string) {
    this.validateHostname(value);
    this._hostname = value;
  }

  private _port: number | null = 8080;
  /**
   * Port part of the uri.
   */
  public get port(): number | null {
    return this._port;
  }
  public set port(value: number | null) {
    this.validatePort(value);
    this._port = value;
  }

  /**
   * Host part of the uri.
   *
   * Host is the concatenation of [[hostname]] and [[port]].
   *
   * ```json
   * "fake-domain.com:3001"
   * ```
   */
  public get host(): string {
    const port = this.port === null ? '' : `:${this.port}`;
    return `${this.hostname}${port}`;
  }

  private validateScheme(scheme: string | null): asserts scheme is Scheme {
    if (!isEnum(Scheme, scheme)) {
      throw new LibError('Uri must have a valid scheme', scheme, Object.values(Scheme).toString());
    }
  }

  private validateAuth(auth: string | null): void {
    if (auth === null) {
      return;
    }

    if (auth.startsWith(':')) {
      throw new LibError('Auth cannot start with [:]', auth);
    }
    const parts = auth.split(':');
    if (parts.length > 2) {
      throw new LibError('Auth cannot have more than 2 parts', auth, 'username:password');
    }
  }

  private validateHostname(host: string | null): asserts host is string {
    if (!host) {
      throw new LibError('Host cannot be empty', host);
    }
  }

  private validatePort(port: number | null): void {
    if (port === null) {
      return;
    }

    if (!Number.isInteger(port)) {
      throw new LibError('Port must be an integer', port.toString());
    }
  }
}
