function deepCopy(data) {
  let copiedData = {};

  // Primitive Type
  if (data === null || typeof data !== "object") {
    return data;
  }

  // Date
  if (data instanceof Date) {
    copiedData = new Date(data);
  }

  // Map
  if (data instanceof Map) {
    copiedData = new Map(data);
  }

  // Set
  if (data instanceof Set) {
    copiedData = new Set(data);
  }

  // Array
  if (data instanceof Array) {
    const copiedArr = data.map((elem) => {
      if (typeof elem !== "object") {
        return elem;
      } else {
        return deepCopy(elem);
      }
    });
    return copiedArr;
  }

  // Object
  for (let key in data) {
    if (typeof data[key] === "object") {
      copiedData[key] = deepCopy(data[key]);
    } else {
      copiedData[key] = data[key];
    }
  }

  return copiedData;
}
