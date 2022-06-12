const fetchAsJson = async <T>(url: string): Promise<T> => {
  const response: any = await fetch(url)
  const json: T = await response.json()
  return json
}

export default fetchAsJson
