export function useUniqueId() {
  const id = Math.ceil(Math.random() * 100)

  return {
    id
  }
}
