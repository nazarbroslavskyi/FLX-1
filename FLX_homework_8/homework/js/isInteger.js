function isInteger (value) {
  return typeof value === 'number'
  && Number.isFinite(value)
  && !(value % 1);
}
isInteger(5);
isInteger(5.1);
