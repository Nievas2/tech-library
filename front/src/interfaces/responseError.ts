export interface ResponseError {
  message: string
  name: string
  stack: string
  config: Config
  code: string
  response: Response
  status: number
  data: Data
}

export interface Config {
  transitional: Transitional
  adapter: string[]
  transformRequest: []
  transformResponse: []
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: Env
  headers: Headers
  method: string
  url: string
  data: string
}

export interface Transitional {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}

export interface Env {}

export interface Headers {
  Accept: string
  "Content-Type": string
}

export interface Response {
  data: Data
  status: number
  statusText: string
  headers: Headers2
  config: Config2
  request: Request
}

export interface Data {
  status: number
  statusMessage: string
}

export interface Headers2 {
  "content-length": string
  "content-type": string
}

export interface Config2 {
  transitional: Transitional2
  adapter: string[]
  transformRequest: []
  transformResponse: []
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
  env: Env2
  headers: Headers3
  method: string
  url: string
  data: string
}

export interface Transitional2 {
  silentJSONParsing: boolean
  forcedJSONParsing: boolean
  clarifyTimeoutError: boolean
}

export interface Env2 {}

export interface Headers3 {
  Accept: string
  "Content-Type": string
}

export interface Request {}
