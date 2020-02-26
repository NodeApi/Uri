import { Uri } from '../Uri';

describe('Uri host tests', () => {

  test('can get host without port', () => {
    const uri = new Uri('http://test.com/');
    expect(uri.host).toBe('test.com');
  });

  test('can get host with port', () => {
    const uri = new Uri('http://test.com:3005/');
    expect(uri.host).toBe('test.com:3005');
  });

});
