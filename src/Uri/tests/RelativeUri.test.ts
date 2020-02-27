import { RelativeUri } from '../RelativeUri';

describe('RelativeUri tests', () => {

  test('can create empty RelativeUri', () => {
    const uri = new RelativeUri();
    expect(uri.path).toBe('/');
    expect(uri.relativeUri).toBe('/');
    expect(uri.toString()).toBe('/');
  });

  test('can change RelativeUri', () => {
    const uri = new RelativeUri();
    uri.path = '/users/2/info';
    uri.fragment = 'nice';
    uri.query.append('sort', 'descending');
    expect(uri.relativeUri).toBe('/users/2/info/?sort=descending#nice');
    expect(uri.toString()).toBe('/users/2/info/?sort=descending#nice');
  });

  test('can parse empty RelativeUri', () => {
    const uri = new RelativeUri('');
    expect(uri.relativeUri).toBe('/');
    expect(uri.toString()).toBe('/');
  });

  test('can parse empty RelativeUri 2', () => {
    const uri = new RelativeUri('/');
    expect(uri.relativeUri).toBe('/');
    expect(uri.toString()).toBe('/');
  });

  test('can parse RelativeUri', () => {
    const uri = new RelativeUri('/users/2/info/?sort=descending#nice');
    expect(uri.relativeUri).toBe('/users/2/info/?sort=descending#nice');
    expect(uri.toString()).toBe('/users/2/info/?sort=descending#nice');
  });

  test('can parse RelativeUri 2', () => {
    const uri = new RelativeUri('users/2/info/?sort=descending#nice');
    expect(uri.relativeUri).toBe('/users/2/info/?sort=descending#nice');
    expect(uri.toString()).toBe('/users/2/info/?sort=descending#nice');
  });

  test('can parse absolute uri', () => {
    const uri = new RelativeUri('http://fake.domain.com/users/2/info/?sort=descending#nice');
    expect(uri.relativeUri).toBe('/users/2/info/?sort=descending#nice');
    expect(uri.toString()).toBe('/users/2/info/?sort=descending#nice');
  });

});
