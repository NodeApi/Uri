import { Query } from '../Query';

describe('Query.ts tests', () => {

  test('empty query should produce empty string', () => {
    const query = new Query();
    const result = query.toString();
    expect(result).toBe('');
  });

  test('query with one segment', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    const result = query.toString();
    expect(result).toBe('?redirectUrl=none');
  });

  test('query with many segment', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    const result = query.toString();
    expect(result).toBe('?redirectUrl=none&test=5&test=43');
  });

  test('can get params', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    const result = query.get('test');
    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('test');
    expect(result[0].value).toBe('5');
  });

  test('can get single params value', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    const result = query.getValue('redirectUrl');
    expect(result).toBe('none');
  });

  test('can get multi params value', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    const result = query.getValue('test');
    expect(result).toBe('5,43');
  });

  test('can get all params', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    const result = query.getAll();
    expect(result).toHaveLength(3);
    expect(result[0].key).toBe('redirectUrl');
    expect(result[0].value).toBe('none');
  });

  test('can delete params', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    query.delete('test');
    const result = query.getAll();
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('redirectUrl');
    expect(result[0].value).toBe('none');
  });

  test('can parse empty string', () => {
    const result = new Query('');
    expect(result.toString()).toBe('');
  });

  test('can override params', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    query.set('test', '1');
    const result = query.get('test');
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('test');
    expect(result[0].value).toBe('1');
  });

  test('can get keys', () => {
    const query = new Query();
    query.append('redirectUrl', 'none');
    query.append('test', '5');
    query.append('test', '43');
    const result = query.keys();
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('redirectUrl');
    expect(result[1]).toBe('test');
  });

  test('should encode key and value', () => {
    const query = new Query();
    query.append('redire<>ctUrl', 'non<>e');
    const result = query.toString();
    expect(result).toBe('?redire%3C%3EctUrl=non%3C%3Ee');
  });

  test('can parse query', () => {
    const result = new Query('?test=test&name=James&test=5');
    expect(result.toString()).toBe('?test=test&name=James&test=5');
  });

  test('can parse query without ?', () => {
    const result = new Query('key1=value1&key2=value2');
    expect(result.toString()).toBe('?key1=value1&key2=value2');
  });
});
