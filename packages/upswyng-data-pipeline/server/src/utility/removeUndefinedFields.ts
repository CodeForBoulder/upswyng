/**
 * Removes the fields from an object which have the value `undefined`.
 * Modifies object in place.
 * @param o A plain Javascript object
 */
export default function removeUndefinedFields(o: Object): void {
  Object.keys(o).forEach(key => {
    if (o[key] === undefined) {
      delete o[key];
    }
    if (Array.isArray(o[key])) {
      o[key].forEach(v => removeUndefinedFields(v));
    } else if (o[key] instanceof Object) {
      removeUndefinedFields(o[key]);
    }
  });
}
