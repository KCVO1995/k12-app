import backgroundApi from './backgroundApi.js'

export const getOptions = (params) => {
  return backgroundApi.get('/option/get_all', { params })
}
