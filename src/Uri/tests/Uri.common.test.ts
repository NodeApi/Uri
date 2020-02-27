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

  test('can create from RelativeUri', () => {
    const uri = new Uri('http://test.com/');
    const relativeUri = new RelativeUri('/user/15?sort=asc#test');
    const newUri = Uri.fromUri(uri, relativeUri);
    expect(newUri.absoluteUri).toBe('http://test.com/user/15/?sort=asc#test');
    expect(newUri.toString()).toBe('http://test.com/user/15/?sort=asc#test');
  });

});
