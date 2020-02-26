export class LibError extends Error {
  constructor(
    message: string,
    received?: string | null,
    expected?: string | null,
  ) {
    super(message);
    this.name = 'LibError';
    this.message += '.';

    if (received !== undefined) {
      this.message += ` Received: [${received}]`;
    }
    if (expected !== undefined) {
      this.message += ` Expected: [${expected}]`;
    }
  }
}
