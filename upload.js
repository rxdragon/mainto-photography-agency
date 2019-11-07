const fs = require('fs')
const path = require('path')
const upyun = require('upyun')
const args = process.argv
args.splice(0, 2)
// 得到配置
let [operator, password, bucket, rootpath, sourcefolder, branchName] = args
sourcefolder = path.resolve(__dirname, sourcefolder)
// 利用upyun包准备上传工具
const service = new upyun.Service(bucket, operator, password)
const client = new upyun.Client(service)
// 要上传的文件列表，html最后上传：[upyun]上传完成前有过访问，会有 5 分钟 404 缓存，需要刷新缓存或等待缓存过期后更新
let htmlFileList = [] // html文件
let fileList = [] // 其他文件

// 上传文件脚本
async function uploadFileList(fileList, client, force) {
  for (let item of fileList) {
    let file = null
    let remoteFile = null
    try {
      // 比对文件大小进行上传
      remoteFile = await client.headFile(item.remotePath)
      if (remoteFile && remoteFile.size === item.size && !force) {
      } else {
        file = fs.readFileSync(item.filePath)
        await client.putFile(item.remotePath, file)
        console.log('\x1b[32m' + item.filePath + '\t上传成功\x1b[0m')
      }
    } catch (err) {
      console.log('\x1b[35m' + item.filePath + '\t上传失败\x1b[0m')
      console.log(err)
      process.exit(1)
    }
  }
}
// 读出所有的文件
function findAllFile(uploadDir, relativePath) {
  let dirExist = fs.existsSync(uploadDir)
  if (dirExist) {
    let res = fs.readdirSync(uploadDir)
    if (res.length === 0) {
      return
    }
    for (let item of res) {
      if (fs.statSync(uploadDir + path.sep + item).isDirectory()) {
        findAllFile(uploadDir + path.sep + item, relativePath + item + path.sep)
      } else {
        let localPath = uploadDir + path.sep + item
        let fileObj = {
          filePath: localPath,
          remotePath: relativePath + item,
          size: fs.statSync(localPath).size
        }
        if (/\.html$/.test(localPath)) {
          htmlFileList.push(fileObj)
        } else {
          fileList.push(fileObj)
        }
      }
    }
  }
}

async function main() {
  let tempRootPath = rootpath
  if (rootpath === '\/ops-himo-user\/' || rootpath === '\/develop-himo-user\/') {
    if (rootpath === '\/ops-himo-user\/' && branchName) {
      let matchRes = branchName.match(/^release-[.0-9]+/)
      tempRootPath = tempRootPath + matchRes[0] + '/'
    }
  }
  findAllFile(sourcefolder, tempRootPath)
  await uploadFileList(fileList, client)
  // 后上传html文件
  await uploadFileList(htmlFileList, client, true)
}
main()