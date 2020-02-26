import { Uri } from '../Uri';

describe('Uri hostname tests', () => {

  test('throw if no hostname in constructor', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('http:///test');
    } catch (err) {
      expect(err.message).toBe('Host cannot be empty. Received: []');
    }
  });

  test('throw if setting empty hostname', () => {
    expect.assertions(1);
    const uri = new Uri('http://test.com/');
    try {
      uri.hostname = '';
    } catch (err) {
      expect(err.message).toBe('Host cannot be empty. Received: []');
    }
  });

  test('can get hostname', () => {
    const uri = new Uri('http://test.com/');
    expect(uri.hostname).toBe('test.com');
  });

  test('can set host', () => {
    const uri = new Uri('http://test.com/');
    uri.hostname = 'newhost.com';
    expect(uri.hostname).toBe('newhost.com');
    expect(uri.absoluteUri).toBe('http://newhost.com/');
  });

});
