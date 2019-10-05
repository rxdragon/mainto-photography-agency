<template>
  <div id="addProduct">
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="contailner" v-if="!loading">
      <a-row class="title">
        <a-col :span="12">
          <span class="tip">新增产品</span>
        </a-col>
      </a-row>
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
              <a-upload :headers="uploadHeader" :action="upyunAction" listType="picture-card" :fileList="product.fileList" @change="handleChange">
                <div>
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </div>
            <a-button type="primary" class="submit" @click="sumbitAdd">
              提交审核
              <a-icon type="cloud" />
            </a-button>
          </a-col>
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
      product: {
        name: '',
        standard: '',
        fileList: []
      },
      uploadHeader: {
        'X-Requested-With': null
      }
    }
  },
  computed: {
    ...mapGetters(['getUpyun']),
    addParams() {
      return {
        name: this.product.name,
        retouchRequire: this.product.standard,
        simplePhotoPaths: this.product.fileList.map(item => item.url)
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
    sumbitAdd() {
      this.loading = true
      this.addSubmit(this.addParams).then((res) => {
        this.$message.success('产品添加成功', 3)
      }).finally(() => {
        this.loading = false
      })
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    initQuery() {
      this.product = {
        name: this.$route.query.name,
        standard: this.$route.query.standard,
        fileList: this.$route.query.url.map((item => {
          return { uid: item, name: this.$route.query.name, url: item }
        }))
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