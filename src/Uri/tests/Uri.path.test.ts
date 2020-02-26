import { Uri } from '../Uri';

describe('Uri path tests', () => {

  test('can get path', () => {
    const uri = new Uri('http://test.com');
    expect(uri.path).toBe('/');
  });

  test('can get path 2', () => {
    const uri = new Uri('http://test.com/');
    expect(uri.path).toBe('/');
  });

  test('can set empty', () => {
    const uri = new Uri('http://test.com/');
    uri.path = '';
    expect(uri.path).toBe('/');
  });

  test('can set path', () => {
    const uri = new Uri('http://test.com/test/test');
    expect(uri.path).toBe('/test/test/');
    uri.path = 'not';
    expect(uri.path).toBe('/not/');
  });

  test('can set path without duplicating end /', () => {
    const uri = new Uri('http://test.com/test/test');
    uri.path = 'not/';
    expect(uri.path).toBe('/not/');
  });

  test('can set path without duplicating start /', () => {
    const uri = new Uri('http://test.com/test/test');
    uri.path = '/not';
    expect(uri.path).toBe('/not/');
  });

});
