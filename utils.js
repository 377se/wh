export function replaceUpdatedObjectInArrayOfObjects(array, updatedobject, prop) {
    let foundIndex = array.findIndex(object => object[prop] == updatedobject[prop])
    array[foundIndex] = updatedobject
    return array
}
