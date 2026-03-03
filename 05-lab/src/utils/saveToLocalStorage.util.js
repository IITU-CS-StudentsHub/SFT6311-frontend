export const saveToLocalStorage = (key, data) => {
  try {
    const raw = JSON.stringify(data)
    localStorage.setItem(key, raw)
  } catch (e) {
    console.error(e)
  }
}
