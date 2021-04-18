import request from '../utils/request'

// 从后端调起GameTes2.0
export const OpenGameTes = () => {
  return request(
    {
      url: 'http://localhost:8080/OpenGameTes',
      method: 'get'
    }
  )
}

// 刷新任务管理界面，任务列表
export const RefreshTask = () => {
  return request(
    {
      url: 'http://localhost:8080/RefreshTask',
      method: 'get'
    }
  )
}

// 删除任务请求，参数为index
export const DeleteTask = params => {
  return request(
    {
      url: 'http://localhost:8080/DeleteTask',
      method: 'get',
      params: params
    }
  )
}

// HiSeeker 提交批处理请求
export const HiSeekerBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// HiSeeker 只执行后端算法
export const HiSeekerJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerJustRun',
      method: 'get'
    }
  )
}

// HiSeeker 只修改输入参数
export const HiSeekerJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/HiSeekerJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// ClusterMI 提交批处理请求
export const ClusterMIBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// ClusterMI 只执行后端算法
export const ClusterMIJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIJustRun',
      method: 'get'
    }
  )
}

// ClusterMI 只修改输入参数
export const ClusterMIJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/ClusterMIJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// DCHE 提交批处理请求
export const DCHEBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/DCHEBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// DCHE 只执行后端算法
export const DCHEJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/DCHEJustRun',
      method: 'get'
    }
  )
}

// DCHE 只修改输入参数
export const DCHEJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/DCHEJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// DECMDR 提交批处理请求
export const DECMDRBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// DECMDR 只执行后端算法
export const DECMDRJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRJustRun',
      method: 'get'
    }
  )
}

// DECMDR 只修改输入参数
export const DECMDRJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/DECMDRJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// MACOED 提交批处理请求
export const MACOEDBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// MACOED 只执行后端算法
export const MACOEDJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDJustRun',
      method: 'get'
    }
  )
}

// MACOED 只修改输入参数
export const MACOEDJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/MACOEDJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// DualWMDR 提交批处理请求
export const DualWMDRBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// DualWMDR 只执行后端算法
export const DualWMDRJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRJustRun',
      method: 'get'
    }
  )
}

// DualWMDR 只修改输入参数
export const DualWMDRJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/DualWMDRJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// MOMDR 提交批处理请求
export const MOMDRBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// MOMDR 只执行后端算法
export const MOMDRJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRJustRun',
      method: 'get'
    }
  )
}

// MOMDR 只修改输入参数
export const MOMDRJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/MOMDRJustSetParams',
      method: 'post',
      params: params
    }
  )
}

// EpiMC 提交批处理请求
export const EpiMCBatchRequest = params => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCBatchRequest',
      method: 'post',
      params: params
    }
  )
}

// EpiMC 只执行后端算法
export const EpiMCJustRun = () => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCJustRun',
      method: 'get'
    }
  )
}

// EpiMC 只修改输入参数
export const EpiMCJustSetParams = params => {
  return request(
    {
      url: 'http://localhost:8080/EpiMCJustSetParams',
      method: 'post',
      params: params
    }
  )
}
