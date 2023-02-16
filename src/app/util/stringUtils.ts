export const stringIsSetAndFilled = function (value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  if (value === null) {
    return false;
  }
  if (value.length === 0) {
    return false;
  }
  return true;
}
