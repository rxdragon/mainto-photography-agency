<template>
  <div id="upload">
    <!-- 照片上传 -->
    <div class="upload">
      <div class="clearfix">
        <ul v-for="(item, index) in imgList" :key="index" class="ant-upload-list ant-upload-list-picture-card">
          <li class="list-wrap">
            <div class="ant-upload-list-item ant-upload-list-item-done">
              <div class="ant-upload-list-item-info">
                <img :src="`${getHost}${item.response.url}`" @load="imgLoad">
                <p class="picture-name">{{ `文件名: ${item.name}` }}</p>
              </div>
              <span class="ant-upload-list-item-actions">
                <i class="anticon anticon-eye-o" @click="previewPicture(item.response.url)">
                  <a-icon type="eye" /></i>
                <i class="anticon anticon-delete" @click="deletePicture(item, index)">
                  <a-icon type="delete" /></i>
              </span>
            </div>
            <p class="picture-count">
              填写人数:
              <a-input placeholder="请填写人数" addon-after="人" :max-length="3" :value="item.people_num" @change="(e) => peopleChange(e, item)" @blur="(e) => onBlur(e, item)" />
            </p>
            <p class="picture-product">
              选择产品:
              <a-select v-model="item.product_id" placeholder="请选择产品类型">
                <a-select-option v-for="(child, childIndex) in productList.msg" :key="childIndex" :value="child.cloud_product_id">{{ child.name }}</a-select-option>
              </a-select>
            </p>
            <p v-if="needSplit(item)" class="picture-product">
              <a-select v-model="item.splice_position" class="concat" placeholder="选择拼接类型">
                <a-select-option v-for="(positionItem, positionIndex) in splitArray" :key="positionIndex" :value="positionItem">{{ positionItem }}</a-select-option>
              </a-select>
              <a-input-number v-model="item.splice_mark" style="width: 40%; margin-left: 4%;" :min="1" :max="99" placeholder="拼接序号" />
            </p>
          </li>
        </ul>
        <a-upload accept="image/*" :multiple="true" :headers="uploadHeader" :action="upyunAction" :before-upload="checkFile" list-type="picture-card" :data="getUpyun" :show-upload-list="false" @change="handleChange">
          <div>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img style="width: 100%" :src="previewImage">
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import { mapGetters, mapState, mapActions } from 'vuex'
import * as utils from '@/util'
export default {
  name: 'Upload',
  data () {
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
      spliceValue: undefined
    }
  },
  computed: {
    ...mapGetters(['getUpyun']),
    ...mapState({
      getHost: state => {
        return state.upyun.host.replace(/com\/(\S*)\//, 'com')
      }
    }),
    upyunAction () {
      return `https://v0.api.upyun.com/${this.getUpyun.bucket}`
    }
  },
  async created () {
    this.productList = await Api.product.listAll()
    this.initUpyun()
  },
  methods: {
    ...mapActions(['initUpyun']),
    onBlur (e, item) {
      const { value } = e.target
      if (value === '') {
        item.people_num = 0
      } else if (value.length > 1) {
        item.people_num = value.replace(/^[0]/, '')
      }
    },
    peopleChange (e, item) {
      const { value } = e.target
      const reg = /^[0-9]+$/g
      if (reg.test(value) || value === '' || value === '-') {
        item.people_num = value
      }
    },
    imgLoad (e) {
      if (e.target.offsetHeight < e.target.offsetWidth) { e.target.style.width = 'auto' }
    },
    async checkFile (file) {
      const md5 = await utils.getFileMd5(file)
      return new Promise((resolve, reject) => {
        for (const item of this.imgList) {
          if (item.name === file.name || md5 === item.md5) {
            this.$message.error('重复照片上传')
            return reject(false)
          }
        }
        return resolve(true)
      })
    },
    getChildPhotos () {
      this.$emit('sendPhotos', this.imgList)
    },
    needSplit (item) {
      const selectId = item.product_id || 0
      const proList = this.productList.msg
      for (const option of proList) {
        const matchId = option.cloud_product_id === selectId
        const needSplicing = option.need_splicing > 0
        if (matchId && needSplicing) { return true }
      }
      return false
    },
    deletePicture (picture, index) {
      this.imgList.splice(index, 1)
    },
    previewPicture (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handleChange ({ file, fileList }) {
      this.fileList = fileList
      if (file.status === 'uploading') {
        this.loading = true
      } else if (file.status === 'done') {
        const md5 = await utils.getFile(`${this.getHost}${file.response.url}`)
        this.imgList.push(Object.assign(file, {
          people_num: '',
          splice_mark: null,
          splice_position: null,
          product_id: undefined,
          md5
        }))
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less">
@import '../style/index.less';
</style>
