<template>
  <div id="productDetail">
    <div v-if="loading" class="spin-content">
      <a-spin size="large" />
    </div>
    <div v-else class="container">
      <a-row class="title">
        <h4><span class="line" /><span>样片素材</span></h4>
      </a-row>
      <section class="form">
        <a-row :span="24" class="item">
          <a-col v-for="(item, index) in product.simple_images" :key="index" class="pictureWrap" :span="6" :offset="1">
            <div class="container-wrap">
              <div class="img-wrap">
                <img :src="`${getHost}${item}${$cutDown}`">
              </div>
              <div class="mask">
                <a-icon type="eye" class="bigger-icon" @click="showModel(item)" />
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row class="item">
          <a-col :span="24" class="product-info">
            <p class="name">产品名称: {{ product.name }}</p>
            <span class="line" />
            <p class="retouch">修图要求: {{ product.retouch_require }}</p>
          </a-col>
        </a-row>
        <a-row v-if="!$route.params.type" class="standard item">
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
        <a-row v-if="!$route.params.type" class="parameter item">
          <a-col :span="6">
            <span class="tip">{{ standardText[product.retouch_standard] || '' }}</span>
          </a-col>
          <a-col :span="6">
            <span class="tip">{{ weightState[product.weight_level] }}</span>
          </a-col>
          <a-col :span="6">
            <span class="tip">{{ product.need_template === 0 ? '不需要' : '需要' }}</span>
          </a-col>
          <a-col :span="6">
            <span class="tip">{{ product.need_splicing === 0 ? '不需要' : '需要' }}</span>
          </a-col>
        </a-row>
        <a-row v-if="product.normal_income_config" class="cut">
          <a-col class="title" :span="24">
            <h4><span class="line" /><span>非拼接收益</span></h4>
          </a-col>
          <a-col :span="24" class="item">
            <ul class="profit">
              <li v-for="(item, index) in product.normal_income_config.retoucher" :key="index">
                <span class="head">{{ `${index}人` }}</span><span>{{ `¥ ${item}` }}</span>
              </li>
            </ul>
          </a-col>
        </a-row>
        <a-row v-if="product.normal_income_config && product.need_splicing !== 0" class="cut">
          <a-col class="title" :span="24">
            <h4><span class="line" /><span>拼接收益</span></h4>
          </a-col>
          <a-col :span="24" class="item">
            <ul class="profit">
              <li v-for="(item, index) in product.splicing_income_config.retoucher" :key="index">
                <span class="head">{{ `${index}人` }}</span><span>{{ `¥ ${item}` }}</span>
              </li>
            </ul>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="title" :span="24">
            <h4><span class="line" /><span>产品备注信息</span></h4>
          </a-col>
          <a-col :span="24" class="item">
            <p class="tip note">{{ product.note || '暂无备注' }}</p>
          </a-col>
        </a-row>
        <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
          <img style="width: 100%;" :src="previewImage">
        </a-modal>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Api from '@/api/index.js'
export default {
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      standardText: {
        blue: '蓝标',
        master: '大师店',
        kids: '海马体儿童',
        mainto: '缦图摄影'
      },
      weightState: {
        weight_first: '一类产品',
        weight_second: '二类产品',
        weight_third: '三类产品',
        weight_fourth: '四类产品',
        weight_fifth: '五类产品'
      },
      loading: true,
      product: {}
    }
  },
  computed: {
    ...mapGetters(['getHost'])
  },
  created () {
    this.reviewProduct()
  },
  methods: {
    showModel (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    reviewProduct () {
      this.loading = true
      Api.product.detail({
        id: this.$route.params.id
      }).then((res) => {
        this.product = res.msg
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less">
@import './style/productDetail.less';
</style>
