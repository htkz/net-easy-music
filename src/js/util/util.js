const deepCopy = (object) => {
  const str = JSON.stringify(object);
  const obj = JSON.parse(str);
  return obj;
}
