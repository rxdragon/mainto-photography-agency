import md5 from 'js-md5'

// 获取图片地址
export function getUglifyImg(url, needUglify = false) {
  let fullUrl = process.env.VUE_APP_UPYUN_HOST + url
  if (needUglify) return fullUrl + '!thumb.small.50'
  return fullUrl
}

// 转化成64位格式图片
export function getBase64Image(img, removeBase64) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  let dataURL = canvas.toDataURL('image/' + ext)
  if (removeBase64) { dataURL = dataURL.replace('data:image/png;base64,', '') }
  return dataURL
}

// 获取远程图片资源
export function getRemoteImg(url, removeBase64 = true) {
  return new Promise(resolve => {
    let image = new Image()
    image.crossOrigin = "Anonymous"
    image.src = url
    image.onload = () => {
      let dataUrl = getBase64Image(image, removeBase64)
      resolve(dataUrl)
    }
  })
}

// 下载功能
export const saveAs = (obj, fileName) => {
  let tmpa = document.createElement('a');
  tmpa.download = fileName || '未命名';
  // 兼容ie 火狐 下载文件
  if (navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(obj, fileName);
  } else if (window.navigator.userAgent.includes('Firefox')) {
    let a = document.createElement('a')
    a.href = URL.createObjectURL(obj)
    a.download = fileName
    document.body.appendChild(a)
    a.click()
  } else {
    tmpa.href = URL.createObjectURL(obj)
  }
  tmpa.click()
  setTimeout(function() {
    URL.revokeObjectURL(obj)
  }, 100)
}

export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function base64ToBlob(code) {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length

  let uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

// 下载单张图片
export function downOneImg(imgObj) {
  getRemoteImg(imgObj.url, false).then(res => {
    saveAs(base64ToBlob(res), imgObj.name)
  })
}

// 转换链接
function toDataUrl(src) {
  return new Promise((resolve, reject) => {
    src += '?t=cross_origin.*'
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = (rsp) => {
      if (rsp.target.status === 200) {
        resolve(rsp.target.response)
      } else {
        reject('error')
      }
    }
    xhr.onerror = (err) => {
      reject(err)
    }
    xhr.open('GET', src, true)
    xhr.send()
  })
}

// 获取文件md5信息
export function getFile(url) {
  return new Promise(resolve => {
    toDataUrl(url).then(res => {
      let render = new FileReader()
      render.readAsArrayBuffer(res)
      render.addEventListener('load', e => {
        let buffer = e.target.result
        let md = md5(buffer)
        resolve(md)
      })
    }).catch(() => {
      resolve('')
    })
  })
}

// 文件对象转md5
export function getFileMd5(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.addEventListener('load', e => {
      let buffer = e.target.result
      let md = md5(buffer)
      resolve(md)
    })
  })
}