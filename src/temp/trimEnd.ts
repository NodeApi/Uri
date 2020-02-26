export function trimEnd(value: string, trimStr: string): string {
  if (value?.endsWith(trimStr)) {
    return value.substring(0, value.length - trimStr.length);
  }

  return value;
}

export function trimStart(value: string, trimStr: string): string {
  if (value?.startsWith(trimStr)) {
    return value.substring(trimStr.length);
  }

  return value;
}

export function trim(value: string, trimStr: string): string {
  return trimEnd(trimStart(value, trimStr), trimStr);
}
