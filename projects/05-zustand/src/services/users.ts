export const getAllUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const json = await res.json()

  return json
}
