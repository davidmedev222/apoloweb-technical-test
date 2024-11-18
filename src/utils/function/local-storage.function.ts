/**
  @param key - Key to store the value
  @param value - Value to store
  @returns This function does not return a value
*/
export function setLocalStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving to local storage with key ${key}`, error)
  }
}

/**
 * @param key - Key to retrieve the value
 * @param defaultValue - Default value to return if the key is not found
 * @returns The value stored in local storage with the given key, or the default value if the key is not found
 */
export function getLocalStorage<T>(key: string, defaultValue: T) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : defaultValue
  } catch (error) {
    console.error(`Error getting from local storage with key ${key}`, error)
    return defaultValue
  }
}

/**
 * @param key - Key to remove from local storage
 * @returns This function does not return a value
 */
export function removeLocalStorage(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from local storage with key ${key}`, error)
  }
}
