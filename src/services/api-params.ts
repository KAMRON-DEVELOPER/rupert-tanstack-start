type ApiParams = Record<string, unknown>

const toSnakeCase = (key: string) =>
  key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

export const toApiParams = <T extends ApiParams>(params: T): ApiParams => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [toSnakeCase(key), value])
  )
}
