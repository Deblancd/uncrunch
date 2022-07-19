export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  if (value === null) {
    return false;
  }

  if (typeof value !== "object") {
    return false;
  }

  if (isArray(value)) {
    return false;
  }

  if (value instanceof Date) {
    return false;
  }

  return true;
}

function isContainer(value) {
  return isArray(value) || isObject(value);
}

function mapObject(object, fn) {
  const acc = {};
  for (let key in object) {
    const value = object[key];
    acc[key] = fn(value, key, object);
  }
  return acc;
}

export function map(container, fn) {
  if (isObject(container)) {
    return mapObject(container, fn);
  }

  return container.map(fn);
}

export function uncrunch(values) {
  const expanded = [];
  const lookup = i => expanded[i];

  expanded.length = values.length; // Hint at array length for perf boost.
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    expanded[i] = isContainer(value) ? map(value, lookup) : value;
  }

  return expanded[expanded.length - 1];
}

response.data = uncrunch(response.data);
