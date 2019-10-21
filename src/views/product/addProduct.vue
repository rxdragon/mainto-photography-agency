<template>
  <div id="addProduct">
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="contailner" v-if="!loading">
      <section class="form">
        <a-row class="item">
          <a-col :span="2">
            <span class="tip name">产品名称: </span>
          </a-col>
          <a-col :span="6">
            <a-input placeholder="填写产品名称" v-model="product.name" />
          </a-col>
        </a-row>
        <a-row class="item">
          <a-col :span="2">
            <span class="tip">修图要求: </span>
          </a-col>
          <a-col :span="6">
            <a-textarea placeholder="请输入修图要求" :rows="4" v-model="product.standard" />
          </a-col>
        </a-row>
        <a-row class="item">
          <a-col :span="2">
            <span class="tip">样片素材: </span>
          </a-col>
          <a-col :span="22">
            <div class="clearfix">
              <a-upload
                :data="getUpyun"
                :headers="uploadHeader"
                :action="upyunAction"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange">
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
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-row>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      previewImage: '',
      previewVisible: false,
      fileList:[],
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
    ...mapGetters(['getUpyun']),
    params() {
      return {
        id: this.$route.query.id || '',
        name: this.product.name,
        retouchRequire: this.product.standard,
        simplePhotoPaths: this.fileList.map((item) => {
          return item.url || item.response.url
        })
      }
    },
    upyunAction() {
      return `https://v0.api.upyun.com/${this.getUpyun.bucket}`
    },
    hasQuery() {
      return this.$route.query.id !== undefined
    },
    addSubmit() {
      return this.hasQuery === true ? Api.product.readd : Api.product.add
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    sumbitAdd() {
      this.loading = true
      this.addSubmit(this.params).then(() => {
        this.$message.success('产品添加成功', 2, this.routeBack)
      }).finally(() => {
        this.loading = false
      })
    },
    initQuery() {
      this.product = {
        name: this.$route.query.name,
        standard: this.$route.query.standard
      }
    }
  },
  created() {
    if (this.hasQuery) { this.initQuery() }
  }
}
</script>
<style lang="less">
@import './style/addProduct.less';
</style>