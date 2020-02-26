export function isKeyOfEnum<T extends object>(
  obj: T, key: string | number | symbol): key is keyof T {
  return typeof key === 'string' && Object.keys(obj).includes(key);
}

export function isEnum<T extends object>(obj: T, key: any): key is T[keyof T] {
  return typeof key === 'string' && Object.values(obj).includes(key);
}
