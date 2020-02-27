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
    const uri = RelativeUri.parse('');
    expect(uri.relativeUri).toBe('/');
    expect(uri.toString()).toBe('/');
  });

  test('can parse empty RelativeUri 2', () => {
    const uri = RelativeUri.parse('/');
    expect(uri.relativeUri).toBe('/');
    expect(uri.toString()).toBe('/');
  });

  test('can parse RelativeUri', () => {
    const uri = RelativeUri.parse('/users/2/info/?sort=descending#nice');
    expect(uri.relativeUri).toBe('/users/2/info/?sort=descending#nice');
    expect(uri.toString()).toBe('/users/2/info/?sort=descending#nice');
  });

  test('can parse RelativeUri 2', () => {
    const uri = RelativeUri.parse('users/2/info/?sort=descending#nice');
    expect(uri.relativeUri).toBe('/users/2/info/?sort=descending#nice');
    expect(uri.toString()).toBe('/users/2/info/?sort=descending#nice');
  });

});
