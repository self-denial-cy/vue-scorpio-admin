import { DataType } from '@/enum';

export function isNumber(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.number;
}
export function isString(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.string;
}
export function isBoolean(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.boolean;
}
export function isNull(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.null;
}
export function isUndefined(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.undefined;
}
export function isObject(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.object;
}
export function isArray(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.array;
}
export function isDate(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.date;
}
export function isRegExp(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.regexp;
}
export function isSet(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.set;
}
export function isMap(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.map;
}
export function isFile(val: unknown) {
  return Object.prototype.toString.call(val) === DataType.file;
}
export function isFunction(val: unknown) {
  return typeof val === DataType.function;
}
