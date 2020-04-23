export {
    isNull,
    isEmpty,
    isStringNull,
    isStringEqualsIC,
    isPromise,
    toPromise,
    parseDate,
    parseDateOnly,
    parseNumber,
    difference,
    every,
    groupBy,
    get,
    find,
    range,
    capitalize,
    ObjectEntry,
    ifNull,
}

const ifNull = <T>(value: T, defaultValue: T): T => {
    return isNull(value) ? defaultValue : value
}

/**
 * Returns `true` if value equals to `null` or `undefined`
 * @param value
 */
const isNull = (value: any) => value === null || value === undefined;

/**
 * Returns `true` if value equals to `null` | `undefined` | `0` or `empty array`
 * @param value
 */
const isEmpty = (value: any | any[]) => {
    return isNull(value) || (Array.isArray(value) ? value.length === 0 : value === 0);
}

/**
 * Returns `true` if string is NULL or has contains only whitespaces.
 * @param value
 */
const isStringNull = (value: string) => isNull(value) || (value || "").trim().length === 0;

/**
 * Returns `true` if two strings are equals ignore case.
 * @param value
 */
const isStringEqualsIC = (left: string, right: string) =>
    typeof (left === "string" && typeof right === "string")
        ? left.localeCompare(right, undefined, { sensitivity: "accent" }) === 0
        : left === right;


const isPromise = (obj: any): obj is Promise<any> => {
    return !isNull(obj) && typeof obj.then === "function";
}

const toPromise = (obj: any): Promise<any> => {
    return isPromise(obj)
        ? obj
        : Promise.resolve(obj)
}

const parseDate = (value: any): Date | null => isNull(value) ? null : new Date(value)

// const parseTime = (value: any): Date | null => {
//     if (isNull(value)) { return null }

//     const time = Time.parse(value)
//     if (isNull(time)) { return null }

//     return time.toDate()
// }

const parseDateOnly = (value: any): Date | null => {
    if (isNull(value)) { return null }

    const date = new Date(value)
    date.setHours(0, 0, 0, 0)
    return date
}

const parseNumber = (value: string | number): number => {
    if (typeof value === "number") { return Number.isNaN(value) ? 0 : value; }
    return isStringNull(value) ? 0 : Number(value);
}

const difference = (left: any[], right: any[]) => left.filter(l => !right.includes(l))

const every = (obj: any, predicate: (p: any) => boolean) => {
    return Array.isArray(obj)
        ? (obj.length > 0 && obj.every(predicate))
        : Object.entries(obj).map(([prop, value]) => ({ prop, value })).every(predicate)
}

const range = (start = 0, end?: number, step = 1) => {
    if (end === undefined) {
        end = start
        start = 0
    }

    step = step === undefined ? (start < end ? 1 : -1) : step

    let index = -1
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
    const result = new Array(length)

    while (length--) {
        result[++index] = start
        start += step
    }

    return result
}

const groupBy = <TItem, TKey>(array: TItem[], keyGetter: (i: TItem) => TKey): Map<TKey, TItem[]> => {
    const map = new Map<TKey, TItem[]>();
    array.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

interface ObjectEntry { key: string, value: any }
function find(obj: any, predicate: (value: ObjectEntry) => boolean): ObjectEntry | undefined;
function find<T = any>(obj: T[], predicate: (value: T) => boolean): T | undefined;
function find(obj: any | any[], predicate: (value: any | ObjectEntry) => boolean) {
    return Array.isArray(obj)
        ? obj.find(predicate)
        : Object.entries(obj).map(p => ({ key: p[0], value: p[1] })).find(p => predicate(p))
}

/**
 * Gets the value of an object at a specific path
 * @param obj An Object
 * @param path Property path
 * @param [deflt] Default value in case of undefined
 * @returns  value or default
 */
const get = (obj: any, path: string, deflt: any = undefined): any => {
    let value = obj
    for (const prop of parsePropertyPath(path)) {
        if (!value || !(prop in value)) { return deflt }

        value = value[prop]
    }

    return value
};

interface ISpinWhileOptions {
    intervalMs?: number
    maxIteration?: number
}

const parsePropertyPath = (path: string): string[] =>
    path.split(".")
        .reduce((result: any, current: any) => {
            const indexes = current.split(/\[([^}]+)\]/g).filter((key: string | any[]) => key.length > 0)

            return [
                ...result,
                ...indexes,
            ]
        }, [])


const capitalize = (text: string): string => {
    return text.trim().replace(/^\w/gi, char => char.toUpperCase())
}
