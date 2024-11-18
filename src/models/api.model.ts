export interface ApiResponse<T> {
  /**
   * Information about the response.
   */
  info: Info
  /**
   * The results of the API call.
   */
  results: T
}

export interface Info {
  /**
   * The total number of results.
   */
  count: number
  /**
   * The URL for the next page of results.
   */
  next: string
  /**
   * The number of pages in the result set.
   */
  pages: number
  /**
   * The URL for the previous page of results.
   */
  prev: null
}
