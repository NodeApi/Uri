import { Uri } from '../Uri';

describe('Uri port tests', () => {

  test('throw if setting NaN port', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http://test.com/test');
      uri.port = 'test' as any;
    } catch (err) {
      expect(err.message).toBe('Port must be an integer. Received: [test]');
    }
  });

  test('throw if setting Float port', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http://test.com/test');
      uri.port = 1.55;
    } catch (err) {
      expect(err.message).toBe('Port must be an integer. Received: [1.55]');
    }
  });

  test('can get port', () => {
    const uri = new Uri('http://test.com:3001/');
    expect(uri.port).toBe(3001);
  });

  test('can get empty port', () => {
    const uri = new Uri('http://test.com/');
    expect(uri.port).toBe(null);
  });

  test('can set port', () => {
    const uri = new Uri('http://test.com/');
    uri.port = 1234;
    expect(uri.port).toBe(1234);
    expect(uri.absoluteUri).toBe('http://test.com:1234/');
  });

  test('can set empty port', () => {
    const uri = new Uri('http://test.com:1234/');
    expect(uri.port).toBe(1234);
    expect(uri.absoluteUri).toBe('http://test.com:1234/');
    uri.port = null;
    expect(uri.port).toBe(null);
    expect(uri.absoluteUri).toBe('http://test.com/');
  });

});
