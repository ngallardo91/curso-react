export const getAllProducts = async () => {
  const res = await fetch('http://localhost:5173/products.json')
  const json = await res.json()
  
  // Add artificial delay to simulate loading
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return json
}