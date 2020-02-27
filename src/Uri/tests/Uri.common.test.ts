import { Uri } from '../Uri';
import { RelativeUri } from '../RelativeUri';

describe('Uri common tests', () => {

  test('throw if empty url', () => {
    expect.assertions(1);
    try {
      const uri = new Uri('');
    } catch (err) {
      expect(err.message).toBe('Uri can\'t be empty. Received: []');
    }
  });

  test('toString() should create absoluteUri', () => {
    const uri = new Uri('http://test.com/?name=bond&firstName=James');
    expect(uri.absoluteUri).toBe('http://test.com/?name=bond&firstName=James');
    expect(uri.toString()).toBe('http://test.com/?name=bond&firstName=James');
  });

  test('can merge path and query with a relative uri', () => {
    const uri = new Uri('http://test.com/users/?limit=10');
    const relativeUri = new RelativeUri('/15/?sort=asc');
    const newUri = Uri.merge(uri, relativeUri);
    expect(newUri.relativeUri).toBe('/users/15/?limit=10&sort=asc');
    expect(newUri.absoluteUri).toBe('http://test.com/users/15/?limit=10&sort=asc');
    expect(newUri.toString()).toBe('http://test.com/users/15/?limit=10&sort=asc');
  });

});
