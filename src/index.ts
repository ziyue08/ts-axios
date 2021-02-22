import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest } from '../helpers/data'
function axios(config: AxiosRequestConfig) {
    processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.data = transformRquestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url, params)
}

function transformRquestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

export default axios
