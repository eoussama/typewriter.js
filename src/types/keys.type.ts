/**
 * @type
 * @description
 * Model key mapper
 */
type Keys<T> = Partial<{ [key in keyof T]: any }>;
export default Keys;
