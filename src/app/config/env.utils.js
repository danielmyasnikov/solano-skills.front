export function getEnv(name, throwError = false) {
  const val = process.env[name];

  if (throwError && !val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}
