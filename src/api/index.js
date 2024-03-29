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

// DualWMDR params上传
export const DualWMDRParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// DualWMDR ResultData Download 结果文件下载
export const DualWMDRResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRResultDataDownload',
      method: 'get'
    }
  )
}

// DualWMDR Poll ResultData 结果轮询
export const DualWMDRPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRPollResultData',
      method: 'post',
      params: params
    }
  )
}

// MOMDR params上传
export const MOMDRParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// MOMDR ResultData Download 结果文件下载
export const MOMDRResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRResultDataDownload',
      method: 'get'
    }
  )
}

// MOMDR Poll ResultData 结果轮询
export const MOMDRPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRPollResultData',
      method: 'post',
      params: params
    }
  )
}

// EpiMC params上传
export const EpiMCParamsUpload = params => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCParamsUpload',
      method: 'post',
      params: params
    }
  )
}

// EpiMC ResultData Download 结果文件下载
export const EpiMCResultDataDownload = () => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCResultDataDownload',
      method: 'get'
    }
  )
}

// EpiMC Poll ResultData 结果轮询
export const EpiMCPollResultData = params => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCPollResultData',
      method: 'post',
      params: params
    }
  )
}

// HiSeeker ResultShow 结果展示
export const HiSeekerResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerResultShow',
      method: 'post',
      params: params
    }
  )
}

// ClusterMI ResultShow 结果展示
export const ClusterMIResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIResultShow',
      method: 'post',
      params: params
    }
  )
}

// DCHE ResultShow 结果展示
export const DCHEResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/DCHEResultShow',
      method: 'post',
      params: params
    }
  )
}

// DECMDR ResultShow 结果展示
export const DECMDRResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRResultShow',
      method: 'post',
      params: params
    }
  )
}

// DualWMDR ResultShow 结果展示
export const DualWMDRResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRResultShow',
      method: 'post',
      params: params
    }
  )
}

// MACOED ResultShow 结果展示
export const MACOEDResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDResultShow',
      method: 'post',
      params: params
    }
  )
}

// MOMDR ResultShow 结果展示
export const MOMDRResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRResultShow',
      method: 'post',
      params: params
    }
  )
}

// EpiMC ResultShow 结果展示
export const EpiMCResultShow = params => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCResultShow',
      method: 'post',
      params: params
    }
  )
}

// HiSeeker ForceStop 强制停止
export const HiSeekerForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerForceStop',
      method: 'get'
    }
  )
}

// ClusterMI ForceStop 强制停止
export const ClusterMIForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIForceStop',
      method: 'get'
    }
  )
}

// DCHE ForceStop 强制停止
export const DCHEForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/DCHEForceStop',
      method: 'get'
    }
  )
}

// DECMDR ForceStop 强制停止
export const DECMDRForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRForceStop',
      method: 'get'
    }
  )
}

// MACOED ForceStop 强制停止
export const MACOEDForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDForceStop',
      method: 'get'
    }
  )
}

// MOMDR ForceStop 强制停止
export const MOMDRForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRForceStop',
      method: 'get'
    }
  )
}

// EpiMC ForceStop 强制停止
export const EpiMCForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCForceStop',
      method: 'get'
    }
  )
}

// DualWMDR ForceStop 强制停止
export const DualWMDRForceStop = () => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRForceStop',
      method: 'get'
    }
  )
}
