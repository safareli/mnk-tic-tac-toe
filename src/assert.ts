export function notNull<T>(input: T | null): input is T {
  return input !== null;
}

export function notUndefined<T>(input: T | undefined): input is T {
  return input !== undefined;
}

export function notNullOrUndefined<T>(input: T | null | undefined): input is T {
  return input != null;
}

export function assert(
  condition: unknown,
  msg?: string | (() => string)
): asserts condition {
  if (condition !== true) {
    throw new Error(
      "Assertion failed; " +
        (msg == null ? "" : typeof msg === "string" ? msg : msg())
    );
  }
}

export function assert_<I, O extends I>(
  value: I,
  check: (input: I) => input is O,
  msg?: string | (() => string)
): O {
  assert(check(value), msg);
  return value;
}

/* examples

function main(x: string | null | undefined): string | undefined {
  assert(x !== null);
  console.log(x);
  return x;
}

function main2(x: string | null | undefined): string {
  assert(notNull(x));
  assert(notUndefined(x));
  console.log(x);
  setTimeout(() => {
    console.log(x);
  });
  return x;
}

function main3(x: string | null | undefined): string | undefined {
  const y = assert_(x, notNull, "x was null");
  console.log(y);
  return y;
}

*/
