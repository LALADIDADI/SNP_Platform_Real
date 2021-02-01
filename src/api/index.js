import request from '../utils/request'

export const fetchData = query => {
  return request({
    url: './table.json',
    method: 'get',
    params: query
  })
}

// 连接测试
export const fetchDemo = query => {
  return request(
    {
      url: 'http://localhost:8080/hello',
      method: 'post',
      params: query
    }
  )
}

// Method1_params上传
export const Method1ParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/Method1_Params',
      method: 'post',
      params: params
    }
  )
}
