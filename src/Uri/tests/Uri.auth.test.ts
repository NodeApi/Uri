import { Uri } from '../Uri';
import { Scheme } from '../Scheme';

describe('Uri auth tests', () => {

  test('can get auth 1', () => {
    const uri = new Uri('http://username@test.com/');
    expect(uri.auth).toBe('username');
  });

  test('can get auth 2', () => {
    const uri = new Uri('http://username:password@test.com/');
    expect(uri.auth).toBe('username:password');
  });

  test('throw when more than 2 parts in constructor', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http://a:b:c@test.com/');
    } catch (err) {
      expect(err.message).toBe('Auth cannot have more than 2 parts. Received: [a:b:c] Expected: [username:password]');
    }
  });

  test('throw when setting more than 2 parts', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http://test.com/');
      uri.auth = 'a:b:c';
    } catch (err) {
      expect(err.message).toBe('Auth cannot have more than 2 parts. Received: [a:b:c] Expected: [username:password]');
    }
  });

  test('throw when no username parts in constructor', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http://:pass@test.com/');
    } catch (err) {
      expect(err.message).toBe('Auth cannot start with [:]. Received: [:pass]');
    }
  });

  test('throw when setting auth without username', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http://test.com/');
      uri.auth = ':pass';
    } catch (err) {
      expect(err.message).toBe('Auth cannot start with [:]. Received: [:pass]');
    }
  });

  test('can set auth', () => {
    const uri = new Uri('http://test.com/');
    uri.auth = 'u:p';
    expect(uri.auth).toBe('u:p');
    expect(uri.absoluteUri).toBe('http://u:p@test.com/');
    uri.auth = null;
    expect(uri.auth).toBe(null);
    expect(uri.absoluteUri).toBe('http://test.com/');
  });

});
