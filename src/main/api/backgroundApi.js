import axios from 'axios'
console.log('fuck')

const headers = {
  adminToken: '',
  csrfToken: ''
}

const getHeaders = () => ({
  cookie: `admin_status=true; _yt_a=faaa3594-f0a3-eecc-e61e-54d32e2db8ae; tempcloseadmininfo=1; _yt_e=https%3A//www.collegepro.cn/pages/shopping%3Fhttps%3A//www.collegepro.cn/pages/shopping; front_custom_variable=zh_CN; checkout_token=296D3F05A7A448B28707EB48161D4ED4; Hm_lvt_4f70660e5e2252bb8347f6da5035ea5c=1659751950; Hm_lpvt_4f70660e5e2252bb8347f6da5035ea5c=1659770396; _homeland_shop_admin_session=${headers.adminToken};`,
  'csrf-token': headers.csrfToken
})

const login = () => {
  console.log('login again')
  return axios
    .post('https://www.k12org.com/center/sessions/login', {
      loginid: '13760668027',
      password: 'Jacky999999'
    })
    .then((res) => {
      const token = res.data.msg.token
      headers.adminToken = token
      console.log('_homeland_shop_admin_session ', token)
      return axios.get(`https://www.k12org.com/center/main/`, {
        headers: {
          referer: 'https://account.youhaosuda.com/',
          cookie: `admin_status=true; _homeland_shop_admin_session=${token}`,
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47'
        }
      })
    })
    .then((res) => {
      const csrfToken = res.data.match(/window.YeeshopManagerConf.ajaxapi_token = '(.*)'/)[1]
      headers.csrfToken = csrfToken
      console.log('csrf-token', csrfToken)
    })
    .catch((e) => {
      console.log(e, '登录失败')
    })
}

const backgroundApi = axios.create({
  baseURL: 'https://www.k12org.com/center',
  timeout: 10000000,
  headers: getHeaders()
})

backgroundApi.interceptors.request.use(function (config) {
  config.headers = getHeaders()
  return config
})

// 添加响应拦截器
backgroundApi.interceptors.response.use(
  async function (response) {
    if (response.data.code === 204 && response.data.msg && response.data.msg.desc === '未登录') {
      console.log('未登录', JSON.stringify(headers))

      return login().then(() => {
        return backgroundApi(response.config)
      })
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default backgroundApi
