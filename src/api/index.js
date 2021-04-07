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
      method: 'get',
      params: query
    }
  )
}

// HiSeeker params上传
export const HiSeekerParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// HiSeeker ResultData Download 结果文件下载
export const HiSeekerResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerResultDataDownload',
      method: 'get'
    }
  )
}

// HiSeeker Poll ResultData 结果轮询
export const HiSeekerPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerPollResultData',
      method: 'post',
      params: params
    }
  )
}

// ClusterMI params上传
export const ClusterMIParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// ClusterMI ResultData Download 结果文件下载
export const ClusterMIResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIResultDataDownload',
      method: 'get'
    }
  )
}

// ClusterMI Poll ResultData 结果轮询
export const ClusterMIPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIPollResultData',
      method: 'post',
      params: params
    }
  )
}

// DCHE params上传
export const DCHEParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/DCHEParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// DCHE ResultData Download 结果文件下载
export const DCHEResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/DCHEResultDataDownload',
      method: 'get'
    }
  )
}

// DCHE Poll ResultData 结果轮询
export const DCHEPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/DCHEPollResultData',
      method: 'post',
      params: params
    }
  )
}

// DECMDR params上传
export const DECMDRParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// DECMDR ResultData Download 结果文件下载
export const DECMDRResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRResultDataDownload',
      method: 'get'
    }
  )
}

// DECMDR Poll ResultData 结果轮询
export const DECMDRPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRPollResultData',
      method: 'post',
      params: params
    }
  )
}

// MACOED params上传
export const MACOEDParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// MACOED ResultData Download 结果文件下载
export const MACOEDResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDResultDataDownload',
      method: 'get'
    }
  )
}

// MACOED Poll ResultData 结果轮询
export const MACOEDPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDPollResultData',
      method: 'post',
      params: params
    }
  )
}
