export interface Profile {
  BACKEND_URL: string
}

export const loadProfile = (): Profile => {
  return {
    BACKEND_URL: 'localhost:8080'
  }
}