# Uri

Work in progress!

@NodeApi/Uri module is a set of abstractions to parse/create/edit uris and query parameters.

It is a wrapper over the outdated and non-intuitive Node.js api.

## Documentation

[@NodeApi/Uri Documentation](https://nodeapi.github.io/Uri/)

## Examples

Easily create and manage an Uri object:

```typescript
const uri = new Uri('https://fakedomain.com/users/15/?sort=descending');
uri.scheme = Scheme.Http;
uri.port = 3000;
uri.toString(); // http://fakedomain.com:3000/users/15/?sort=descending
```

Easily create and manage an RelativeUri object:

```typescript
const uri = new RelativeUri('/users/15/?sort=descending');
uri.query.append('limit', '100');
uri.fragment = 'test';
uri.toString(); // /users/15/?sort=descending&limit=100#test
```

Easily merge Uri and RelativeUri:

```typescript
const uri = new Uri('https://fakedomain.com/users/?limit=10');
const relativeUri = new RelativeUri('/15/licenses?sort=descending');
const newUri = Uri.merge(uri, relativeUri);
newUri.toString(); // https://fakedomain.com/users/15/licenses/?limit=10&sort=descending
```

Easily manage query parameters:

```typescript
const query = new Query();
query.append('key1', 'value1');
query.append('key2', 'value2');
query.toString(); // ?key1=value1&key2=value2
```
