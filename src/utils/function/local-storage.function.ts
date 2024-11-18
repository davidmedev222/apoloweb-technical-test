export function setLocalStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving to local storage with key ${key}`, error)
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : defaultValue
  } catch (error) {
    console.error(`Error getting from local storage with key ${key}`, error)
    return defaultValue
  }
}

export function removeLocalStorage(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from local storage with key ${key}`, error)
  }
}
