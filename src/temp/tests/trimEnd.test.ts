import { trimEnd, trimStart } from '../trimEnd';

describe('trimEnd.ts tests', () => {

  it('should trim one : char at the end', () => {
    const result = trimEnd('abcd::', ':');
    expect(result).toBe('abcd:');
  });

  it('should trim two : char at the end', () => {
    const result = trimEnd('abcd::', '::');
    expect(result).toBe('abcd');
  });

  it('should not change original string', () => {
    const result = trimEnd(':ab:cd', '');
    expect(result).toBe(':ab:cd');
  });

});

describe('trimStart.ts tests', () => {

  it('should trim one : char at the start', () => {
    const result = trimStart('::abcd', ':');
    expect(result).toBe(':abcd');
  });

  it('should trim two : char at the end', () => {
    const result = trimStart('::abcd', '::');
    expect(result).toBe('abcd');
  });

  it('should not change original string', () => {
    const result = trimStart(':ab:cd', '');
    expect(result).toBe(':ab:cd');
  });

});
