import md5 from 'js-md5'
const fileType = require('file-type')

/**
 * @description 处理图片地址
 * @param {String} path 图片地址
 * @param {String} type 系统类型，外包系统相关(bpo)，云端系统相关(cloud)，云学院相关(cschool)，不传默认为：云端
 */
export function handlePicPath (path, type) {
  let resPath = ''
  // 线上环境存储目录
  const prodFilePath = '/upload/'
  // 开发环境存储目录
  const devFilePath = '/upload_dev/'
  resPath = (path.replace(devFilePath, '')).replace(prodFilePath, '')
  return resPath
}

/**
 * @description 获取文件后缀
 * @param {*} name
 */
export function getFilePostfix (name) {
  const indexPoint = name.lastIndexOf('.') + 1
  return name.substring(indexPoint)
}

/**
 * @description 截取文件名
 * @param {*} name
 */
export function fileNameFormat (name) {
  const indexPoint = name.lastIndexOf('.')
  const returnName = name
  return returnName.substring(0, indexPoint)
}

/**
 * @description 分区读取文件
 * @param {*} file
 * @param {*} chunkCallback
 * @param {*} endCallback 结束回调用
 */
function readChunked (file, chunkCallback, endCallback) {
  const fileSize = file.size
  const chunkSize = 4 * 1024 * 1024 // 4MB
  let offset = 0
  const reader = new FileReader()
  const readNext = () => {
    const fileSlice = file.slice(offset, offset + chunkSize)
    reader.readAsArrayBuffer(fileSlice)
  }

  reader.onload = () => {
    if (reader.error) {
      endCallback(reader.error || {})
      return
    }
    offset += reader.result.byteLength
    chunkCallback(reader.result, offset, fileSize)
    if (offset >= fileSize) {
      endCallback(null)
      return
    }
    readNext()
  }

  reader.onerror = (err) => {
    endCallback(err || {})
  }

  readNext()
}

/**
 * @description 获取文件md5
 * @param {*} file
 * @param {*} cbProgress
 */
function getMD5 (file, cbProgress) {
  let fileInfo = null
  return new Promise((resolve, reject) => {
    const hash = md5.create()
    readChunked(file, (chunk, offs, total) => {
      hash.update(chunk)
      if (cbProgress) {
        cbProgress(offs / total)
      }
      if (offs - chunk.byteLength === 0) {
        fileInfo = fileType(chunk)
      }
    }, err => {
      if (err) {
        reject(err)
      } else {
        resolve({
          md5: hash.hex(),
          typeInfo: fileInfo
        })
      }
    })
  })
}

/**
 * @description 获取图片md5值
 * @param {*} file
 */
export async function getImgBufferPhoto (file) {
  const data = await getMD5(file)
  const fileExt = getFilePostfix(file.name).toLowerCase()
  const originalExt = data.typeInfo.ext.toLowerCase()
  if (fileExt !== originalExt) {
    return Promise.reject(`${file.name}格式错误, 原格式为${originalExt}`)
  }
  return data
}
