export function AppResponse(initial) {
  this.data = null;
  this.statusCode = NaN;
  this.ok = false;
  this.errors = {};

  Object.seal(this);
  Object.assign(this, initial);
}
