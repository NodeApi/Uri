import { Uri } from '../Uri';

describe('Uri query tests', () => {

  test('can get query', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James');
    expect(uri.query.toString()).toBe('?name=bond&firstName=James');
    expect(uri.absoluteUri).toBe('http://test.com/?name=bond&firstName=James');
  });

  test('can modify query', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James');
    uri.query.append('age', '99');
    expect(uri.query.toString()).toBe('?name=bond&firstName=James&age=99');
    expect(uri.absoluteUri).toBe('http://test.com/?name=bond&firstName=James&age=99');
  });

});
