<template>
  <div id='upload'>
    <!-- 照片上传 -->
    <div class="upload">
      <div class="clearfix">
        <ul class="ant-upload-list ant-upload-list-picture-card" v-for="(item, index) in imgList" :key="index">
          <li class="list-wrap">
            <div class="ant-upload-list-item ant-upload-list-item-done">
              <div class="ant-upload-list-item-info" style="text-align: center;">
                <img :src="`${getHost}${item.response.url}`">
                <p class="picture-name">{{`文件名: ${item.name}`}}</p>
              </div>
              <span class="ant-upload-list-item-actions" style="top: 120px">
                <i class="anticon anticon-eye-o" @click="previewPicture(item.response.url)">
                  <a-icon type="eye" /></i>
                <i class="anticon anticon-delete" @click="deletePicture(item, index)">
                  <a-icon type="delete" /></i>
              </span>
            </div>
            <p class="picture-count">
              选择人数:
              <a-input-number style="width: 70%;" :min="0" :max="99" v-model="item.people_num" :formatter="value => `${value} 人`" :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
            </p>
            <p class="picture-product">
              选择产品:
              <a-select placeholder="请选择产品类型" style="width: 70%" v-model="item.product_id">
                <a-select-option v-for="(child, childIndex) in productList.msg" :key="childIndex" :value="child.cloud_product_id">{{child.name}}</a-select-option>
              </a-select>
            </p>
            <p class="picture-product" v-if="needSplit(item)">
              <a-select placeholder="选择拼接类型" style="width: 55%" v-model="item.splice_position">
                <a-select-option v-for="(item, index) in splitArray" :key="index" :value="item">{{item}}</a-select-option>
              </a-select>
              <a-input-number style="width: 40%; margin-left: 4%;" :min="1" :max="99" v-model="item.splice_mark" placeholder="拼接序号" />
            </p>
          </li>
        </ul>
        <a-upload
          accept="image/*"
          :multiple='true'
          :headers="uploadHeader"
          :action="upyunAction"
          :beforeUpload="checkFile"
          listType="picture-card"
          @change="handleChange"
          :data="getUpyun"
          :showUploadList="false">
          <div>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import { mapGetters, mapState } from 'vuex'
import * as utils from '@/util'
export default {
  name: 'upload',
  data() {
    return {
      productList: [],
      uploadHeader: {
        'X-Requested-With': null
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      imgList: [],
      count: 0,
      splitIndex: '',
      splitArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      loading: false,
      productValue: undefined,
      spliceValue: undefined,
    }
  },
  computed: {
    ...mapGetters(['getUpyun']),
    ...mapState({
      getHost: state => {
        return state.upyun.host.replace(/com\/(\S*)\//, 'com')
      }
    }),
    upyunAction() {
      return `https://v0.api.upyun.com/${this.getUpyun.bucket}`
    }
  },
  methods: {
    async checkFile(file) {
      let md5 = await utils.getFileMd5(file)
      return new Promise((resolve, reject) => {
        for (let item of this.imgList) {
          if (item.name === file.name || md5 === item.md5) {
            this.$message.error('重复照片上传');
            return reject(false)
          }
        }
        return resolve(true)
      })
    },
    getChildPhotos() {
      this.$emit('sendPhotos', this.imgList)
    },
    needSplit(item) {
      let selectId = item.product_id || 0
      let proList = this.productList.msg
      for (let option of proList) {
        let matchId = option.cloud_product_id === selectId
        let needSplicing = option.need_splicing > 0
        if (matchId && needSplicing) { return true }
      }
      return false
    },
    deletePicture(picture, index) {
      this.imgList.splice(index, 1)
    },
    previewPicture(url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handleChange({ file, fileList }) {
      this.fileList = fileList
      if (file.status === 'uploading') {
        this.loading = true
      } else if (file.status === 'done') {
        const md5 = await utils.getFile(`${this.getHost}${file.response.url}`)
        this.imgList.push(Object.assign(file, {
          people_num: 0,
          splice_mark: undefined,
          splice_position: undefined,
          product_id: undefined,
          md5: md5
        }))
        this.loading = false
      }
    },
  },
  async created() {
    this.productList = await Api.product.listAll()
  }
}
</script>
<style lang="less">
@import '../style/index.less';
</style>