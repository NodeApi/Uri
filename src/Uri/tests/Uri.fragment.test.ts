import { Uri } from '../Uri';

describe('Uri fragment tests', () => {

  test('can get fragment', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James#test');
    expect(uri.fragment).toBe('test');
  });

  test('can be null', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James');
    expect(uri.fragment).toBe(null);
  });

  test('can be empty', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James#');
    expect(uri.fragment).toBe(null);
  });

  test('can set as null', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James#test');
    uri.fragment = null;
    expect(uri.fragment).toBe(null);
  });

  test('can set', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James#test');
    uri.fragment = 'api';
    expect(uri.fragment).toBe('api');
  });

  test('should url encode fragment', () => {
    const uri = new Uri('http://test.com');
    uri.fragment = 'tes<>t';
    expect(uri.fragment).toBe('tes%3C%3Et');
    expect(uri.relativeUri).toBe('/#tes%3C%3Et');
  });

  test('should startTrim # when setting', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James');
    uri.fragment = '#api';
    expect(uri.fragment).toBe('api');
  });

  test('will render in absolute uri 1', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James#test');
    expect(uri.toString()).toBe('http://test.com/?name=bond&firstName=James#test');
  });

  test('will render in absolute uri 2', () => {
    const uri = new Uri('http://test.com#test');
    expect(uri.toString()).toBe('http://test.com/#test');
  });

  test('will not render in absolute uri if null', () => {
    const uri = new Uri('http://test.com');
    expect(uri.toString()).toBe('http://test.com/');
  });

});
