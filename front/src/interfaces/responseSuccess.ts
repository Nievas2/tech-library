import { Library } from "./Library"

export interface ResponseSuccess {
  results: Library[]
  current_page: number
  total_pages: number
  status: number
  statusMessage: string
  data: DataDetails
  headers: Headers
  config: Config
}

interface DataDetails {
  name: string
  description: string
  link: string
  tags: Tag[]
  createdBy: CreatedBy
  createdAt: string
  state: string
  id: string
  likesCount: number
  statusMessage: string
}

interface Tag {
  name: string
  color: string
  id: string
}

interface CreatedBy {
  username: string
  email: string
  id: string
}

interface Headers {
  "content-length": string
  "content-type": string
}

interface Config {
  transitional: Transitional
  adapter: string[]
  transformRequest: []
  transformResponse: []
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: string
  headers: Record<string, string>
  method: string
  url: string
  data: string
}

interface Transitional {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}
