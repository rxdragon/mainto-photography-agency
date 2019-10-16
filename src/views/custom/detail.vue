<template>
  <div id='customDetail'>
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="contaner" v-else>
      <section class='content'>
        <div class="orderInfo">
          <h4>
            <span class="line"></span>
            <span>订单信息</span>
          </h4>
          <ul>
            <li>
              <p class="head">订单标题</p>
              <p>{{order.title}}</p>
            </li>
            <li>
              <a-row>
                <a-col :span="12">
                  <p class="head">拍摄产品</p>
                  <p>{{order.products.join('、') }}</p>
                </a-col>
                <a-col :span="12">
                  <p class="head">上传人</p>
                  <p class="iconLine"><span></span>{{order.photographer}}</p>
                </a-col>
              </a-row>
            </li>
            <li>
              <p class="head">修图备注</p>
              <p>{{order.retouch_note}}</p>
            </li>
          </ul>
        </div>
        <div class="pictureInfo">
          <h4>
            <span class="line"></span><span>照片信息</span>
            <div class="float-button">
              <a-button type="primary" class="origin" @click="createZip('first')">原片下载</a-button>
              <a-button type="primary" @click="createZip('complete')">云端成片下载</a-button>
            </div>
          </h4>
          <ul>
            <li v-for="(item, index) in order.streams" :key="index">
              <a-alert :message="item.product" type="info" />
              <a-row type="flex" justify="start" class="pirtureWrap">
                <a-col :span="8" class="item" v-for="(childItem, childIndex) in item.photos" :key="childIndex">
                  <img :src="childItem.path">
                  <p class="tip">
                    <span class="mask"></span>
                    <span class="text">{{versionState[childItem.version]}}</span>
                  </p>
                </a-col>
              </a-row>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import JsZip from 'jszip'
import * as utils from '@/util'
import moment from 'moment'
export default {
  name: 'custom',
  data() {
    return {
      loading: false,
      versionState: {
        first_photo: '原片',
        complete_photo: '云端成片'
      }
    }
  },
  computed: {
    photoQueue() {
      let photoList = {
        firstArr: [],
        completeArr: []
      }
      if (!this.order.streams.length) { return list }
      this.order.streams.map((item) => {
        let itemList = item.photos
        itemList.map((item) => {
          if (item.version === 'complete_photo') {
            photoList.completeArr.push(item.path)
          } else if (item.version === 'first_photo') {
            photoList.firstArr.push(item.path)
          }
        })
      })
      return photoList
    }
  },
  methods: {
    reviewOrder() {
      this.loading = true
      Api.work.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.order = res.msg
      }).finally(() => {
        this.loading = false
      })
    },
    createZip(type) {
      const PHOTOQUEUE = type === 'first' ? this.photoQueue['firstArr'] : this.photoQueue['completeArr']
      let zip = new JsZip()
      let fold = zip.folder('原片')
      let transArr = []
      PHOTOQUEUE.map((obj) => {
        transArr.push(utils.getRemoteImg(obj).then(res => {
          fold.file(`${moment().format('YYYY-MM-DD HH-mm-ss')}.png`, res, { base64: true })
        }))
      })
      Promise.all(transArr).then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
          utils.saveAs(content, `原片 ${moment().format('YYYY-MM-DD HH-mm-ss')}.zip`);
        })
      })

    }
  },
  created() {
    this.reviewOrder()
  }
}
</script>
<style lang="less">
@import './style/detail.less';
</style>