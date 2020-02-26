import { Uri } from '../Uri';
import url from 'url';

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

});
