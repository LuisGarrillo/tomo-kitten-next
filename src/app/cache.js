export function getData(key, defaultValue) {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(key);
    if (storedData) {
        try {
          return JSON.parse(storedData);
        } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error);
          return defaultValue; // Retorna el valor por defecto en caso de error
        }
      }
  }
  return defaultValue;
}

export function saveData(data, key) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}