<template>
  <div id="productDetail">
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="container" v-if="!loading">
      <a-row class="title">
        <h4><span class="line"></span><span>样片素材</span></h4>
      </a-row>
      <section class="form">
        <a-row :span="24" class="item">
          <a-col class="pictureWrap" :span="5" :offset="1" v-for="(item, index) in product.simple_image_url" :key="index">
            <img :src="item">
          </a-col>
        </a-row>
        <a-row class="item">
          <a-col :span="24" class="product-info">
            <p class="name">产品名称: {{product.name}}</p>
            <span class="line"></span>
            <p class="retouch">修图要求: {{product.retouch_require}}</p>
          </a-col>
        </a-row>
        <a-row class="standard item">
          <a-col :span="6">
            <span class="tip">修图标准: </span>
          </a-col>
          <a-col :span="6">
            <span class="tip">权重等级: </span>
          </a-col>
          <a-col :span="6">
            <span class="tip">模版占位: </span>
          </a-col>
          <a-col :span="6">
            <span class="tip">照片拼接: </span>
          </a-col>
        </a-row>
        <a-row class="parameter item">
          <a-col :span="6">
            <span class="tip">{{product.retouch_standard}}</span>
          </a-col>
          <a-col :span="6">
            <span class="tip">{{weightState[product.weight_level]}}</span>
          </a-col>
          <a-col :span="6">
            <span class="tip">{{product.need_template === 0 ? '不需要' : '需要'}}</span>
          </a-col>
          <a-col :span="6">
            <span class="tip">{{product.need_splicing === 0 ? '不需要' : '需要'}}</span>
          </a-col>
        </a-row>
        <a-row class="cut">
          <a-col class="title" :span="24">
            <h4><span class="line"></span><span>非拼接收益</span></h4>
          </a-col>
          <a-col :span="24" class="item">
            <ul class="profit">
              <li v-for="(item, index) in product.normal_income_config" :key="index">
                <span class="head">{{`${index}人`}}</span><span>{{`$ ${item}`}}</span>
              </li>
            </ul>
          </a-col>
        </a-row>
        <a-row class="cut">
          <a-col class="title" :span="24">
            <h4><span class="line"></span><span>拼接收益</span></h4>
          </a-col>
          <a-col :span="24" class="item">
            <ul class="profit">
              <li v-for="(item, index) in product.splicing_income_config" :key="index">
                <span class="head">{{`${index}人`}}</span><span>{{`$ ${item}`}}</span>
              </li>
            </ul>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="title" :span="24">
            <h4><span class="line"></span><span>产品备注信息</span></h4>
          </a-col>
          <a-col :span="24" class="item">
            <p class="tip note">{{product.remark}}</p>
          </a-col>
        </a-row>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  data() {
    return {
      weightState: {
        weight_first: '一类产品',
        weight_second: '二类产品',
        weight_third: '三类产品',
        weight_fourth: '四类产品',
        weight_fifth: '五类产品'
      },
      loading: false,
      product: {}
    }
  },
  methods: {
    reviewProduct() {
      this.loading = true
      Api.product.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.product = res.msg
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.reviewProduct()
  }
}
</script>
<style lang="less">
@import './style/productDetail.less';
</style>