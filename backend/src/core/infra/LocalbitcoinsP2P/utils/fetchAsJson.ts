import fetch from 'node-fetch'

const fetchAsJson = async <T>(url: string): Promise<T> => {
  const response: any = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })
  const json: T = await response.json()
  return json
}

export default fetchAsJson
