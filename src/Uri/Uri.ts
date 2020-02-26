import url from 'url';
import { Scheme } from './Scheme';
import { isEnum } from '../temp/isKeyOfEnum';
import { trimEnd, trim, trimStart } from '../temp/trimEnd';
import { LibError } from '../temp/LibError';
import { Query } from '../Query/Query';

// https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

export class Uri {

  constructor(uri: string) {
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

    const port = nativeUrl.port === null ? null : Number(nativeUrl.port);
    this.validatePort(port);
    this._port = port;

    const path = nativeUrl.pathname;
    this.validatePath(path);
    this.path = path;

    this.query = Query.parse(nativeUrl.search || '');

    this.fragment = nativeUrl.hash;
  }

  public get absoluteUri(): string {
    const auth = this.auth ? `${this.auth}@` : '';
    const fragment = this.fragment ? `#${this.fragment}` : '';
    return `${this.scheme}://${auth}${this.host}${this.path}${this.query.toString()}${fragment}`;
  }

  public toString(): string {
    return this.absoluteUri;
  }

  private _scheme: Scheme;
  public get scheme(): Scheme {
    return this._scheme;
  }
  public set scheme(value: Scheme) {
    this.validateScheme(value);
    this._scheme = value;
  }

  private _auth: string | null;
  public get auth(): string | null {
    return this._auth;
  }

  public set auth(value: string | null) {
    this.validateAuth(value);
    this._auth = value;
  }

  private _hostname: string;
  public get hostname(): string {
    return this._hostname;
  }
  public set hostname(value: string) {
    this.validateHostname(value);
    this._hostname = value;
  }

  private _port: number | null;
  public get port(): number | null {
    return this._port;
  }
  public set port(value: number | null) {
    this.validatePort(value);
    this._port = value;
  }

  public get host(): string {
    const port = this.port === null ? '' : `:${this.port}`;
    return `${this.hostname}${port}`;
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

  private validatePath(path: string | null): asserts path is string {
    if (!path) {
      throw new LibError('Path cannot be empty', path);
    }
  }
}
