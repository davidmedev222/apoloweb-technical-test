export interface ApiResponse<T> {
  info: Info
  results: T
}

export interface Info {
  count: number
  next: string
  pages: number
  prev: null
}
