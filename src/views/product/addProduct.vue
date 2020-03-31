<template>
  <div id="addProduct">
    <div class="contailner">
      <section class="form">
        <a-row class="item">
          <a-col :span="2">
            <span class="tip name"><b>*</b> 产品名称: </span>
          </a-col>
          <a-col :span="6">
            <a-input v-model="product.name" placeholder="填写产品名称" />
          </a-col>
        </a-row>
        <a-row class="item">
          <a-col :span="2">
            <span class="tip"><b>*</b> 修图要求: </span>
          </a-col>
          <a-col :span="6">
            <a-textarea v-model="product.standard" placeholder="请输入修图要求" :rows="4" />
          </a-col>
        </a-row>
        <a-row class="item">
          <a-col :span="2">
            <span class="tip"><b>*</b> 样片素材: </span>
          </a-col>
          <a-col :span="22">
            <div class="clearfix">
              <a-upload
                accept="image/*"
                :data="getUpyun"
                :multiple="true"
                :headers="uploadHeader"
                :action="upyunAction"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div>
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </div>
            <a-button type="primary" class="submit" @click="sumbitAdd">
              提交审核
            </a-button>
          </a-col>
          <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
            <img alt="example" style="width: 100%;" :src="previewImage">
          </a-modal>
        </a-row>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      previewImage: '',
      previewVisible: false,
      fileList: [],
      product: {
        name: '',
        standard: ''
      },
      uploadHeader: {
        'X-Requested-With': null
      }
    }
  },
  computed: {
    ...mapGetters(['getUpyun', 'getHost']),
    params () {
      return {
        id: this.$route.query.id || '',
        name: this.product.name,
        retouchRequire: this.product.standard,
        simplePhotoPaths: this.fileList.map((item) => {
          const url = item.url || item.response.url
          const returnUrl = url.replace(/\/(\S*)\//, '')
          return returnUrl.replace('https:', '').replace('http:', '')
        })
      }
    },
    upyunAction () {
      return `https://upload.qiniup.com/`
    },
    hasQuery () {
      return this.$route.query.id !== undefined
    },
    addSubmit () {
      return this.hasQuery === true ? Api.product.readd : Api.product.add
    }
  },
  created () {
    if (this.hasQuery) {
      this.initQuery()
    }
    this.initUpyun()
  },
  methods: {
    ...mapActions(['initUpyun']),
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ file, fileList }) {
      this.fileList = fileList
      if (file.status === 'error') {
        return this.$message.error('upyun 上传异常')
      }
    },
    sumbitAdd () {
      // TODO: 后续增补Verification模块
      if (!this.product.name || !this.product.standard || !this.fileList.length) {
        return this.$message.error('请填写完整信息')
      }
      for (const photo of this.fileList) {
        if (photo.status !== 'done') {
          return this.$message.error('请等待图片上传完成!')
        }
      }
      this.$emit('loading', true)
      this.addSubmit(this.params).then(() => {
        this.product = { name: '', standard: '' }
        this.fileList = []
        this.$message.success('产品添加成功')
        this.routeBack()
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.$emit('loading', false)
      })
    },
    initQuery () {
      this.product = {
        name: this.$route.query.name,
        standard: this.$route.query.standard
      }
      this.$route.query.url.map((item) => {
        this.fileList.push({
          uid: this.$route.query.name,
          status: 'done',
          name: item,
          url: `${this.getHost}${item}`
        })
      })
    }
  }
}
</script>
<style lang="less">
@import './style/addProduct.less';
</style>
