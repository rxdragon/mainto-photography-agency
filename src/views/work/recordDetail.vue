<template>
  <div id="recordDetail">
    <div v-if="loading" class="spin-content">
      <a-spin size="large" />
    </div>
    <div v-if="!loading" class="container">
      <section class="content">
        <div class="orderInfo">
          <h4><span class="line" /><span>订单信息</span></h4>
          <a-row class="item">
            <a-col :span="12">
              <span>订单标题: </span>
              <p class="text">{{ order.title }}</p>
            </a-col>
            <a-col :span="10">
              <span>订单产品: </span>
              <p class="text">{{ order.products.join('、') }}</p>
            </a-col>
          </a-row>
          <a-row class="item">
            <span class="head">修图备注:</span>
            <p class="text">{{ order.retouch_note }}</p>
          </a-row>
        </div>
        <div class="pictureInfo">
          <h4><span class="line" /><span>照片信息</span></h4>
          <ul>
            <li v-for="(item, index) in order.streams" :key="index">
              <div class="alert-wrap">
                <a-alert :message="`${item.product} (流水号: ${item.stream_num}) `" type="info" />
              </div>
              <a-row v-for="(childItem, childIndex) in item.photos" :key="childIndex" type="flex" justify="start" class="pirtureWrap">
                <a-col v-for="(photoItem, photoIndex) in childItem" :key="photoIndex" :span="7" class="item">
                  <div class="container">
                    <div class="img-wrap">
                      <photo-box :img-src="`${getHost}${photoItem.path}${$cutDown}`" />
                    </div>
                    <div class="mask">
                      <a-icon type="eye" class="bigger-icon" @click="showModel(photoItem.path)" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </li>
          </ul>
        </div>
      </section>
      <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
        <img style="width: 100%;" :src="previewImage">
      </a-modal>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import PhotoBox from '@/components/PhotoBox/index'
import { mapGetters } from 'vuex'

export default {
  name: 'WorkRecord',
  components: { PhotoBox },
  data () {
    return {
      order: {},
      previewImage: '',
      previewVisible: false,
      versionState: {
        original_photo: '原片',
        complete_photo: '云端成片',
        first_photo: '一次成片'
      },
      loading: true
    }
  },
  computed: {
    ...mapGetters(['getHost'])
  },
  created () {
    this.reviewOrder()
  },
  methods: {
    showModel (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    reviewOrder () {
      Api.work.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.order = res.msg
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
@import './style/recordDetail.less';
</style>
