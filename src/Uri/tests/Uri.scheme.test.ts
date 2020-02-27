import { Uri } from '../Uri';
import { Scheme } from '../Scheme';

describe('Uri scheme tests', () => {

  test('throw if no scheme in constructor', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('test');
    } catch (err) {
      expect(err.message).toBe('Uri must have a valid scheme. Received: [] Expected: [http,https]');
    }
  });

  test('throw if setting invalid scheme', () => {
    expect.assertions(1);
    const uri = new Uri('http://test.com/');
    try {
      uri.scheme = 'invalid' as any;
    } catch (err) {
      expect(err.message).toBe('Uri must have a valid scheme. Received: [invalid] Expected: [http,https]');
    }
  });

  test('can get scheme', () => {
    const uri = new Uri('http://test.com/');
    expect(uri.scheme).toBe('http');
  });

  test('can set scheme', () => {
    const uri = new Uri('http://test.com/');
    uri.scheme = Scheme.Https;
    expect(uri.scheme).toBe('https');
    expect(uri.absoluteUri).toBe('https://test.com/');
  });

});
