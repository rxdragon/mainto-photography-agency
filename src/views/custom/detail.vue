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
              <a-row type="flex" justify="start" class="pirtureWrap" v-for="(childItem, childIndex) in item.photos" :key="childIndex">
                <a-col :span="7" class="item" v-for="(photoItem, photoIndex) in childItem" :key="photoIndex" v-show="photoItem.version !== 'first_photo'">
                  <div class="container-wrap">
                    <div class="img-wrap">
                      <img :src="`${photoHost}${photoItem.path}`" @load="imgLoad">
                    </div>
                    <div class="imgMask">
                      <a-icon type="eye" class="bigger-icon" @click="showModel(photoItem.path)" />
                    </div>
                  </div>
                  <p class="tip">
                    <span class="button" @click="download(`${photoHost}${photoItem.path}`)">下载照片</span>
                    <span class="text">{{versionState[photoItem.version]}}</span>
                  </p>
                </a-col>
              </a-row>
            </li>
          </ul>
        </div>
        <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
          <img style="width: 100%" :src="previewImage" />
        </a-modal>
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
      previewVisible: false,
      previewImage: '',
      photoHost: 'http://fed.dev.hzmantu.com/upload_dev/',
      versionState: {
        original_photo: '原片',
        complete_photo: '云端成片'
      }
    }
  },
  computed: {
    photoQueue() {
      let photoList = { firstArr: [], completeArr: [] }
      this.order.streams.map((item) => {
        let itemList = item.photos
        itemList.map((item) => {
          item.map((photoItem) => {
            if (photoItem.version === 'complete_photo') {
              photoList.completeArr.push(`${this.photoHost}${photoItem.path}`)
            } else if (photoItem.version === 'original_photo') {
              photoList.firstArr.push(`${this.photoHost}${photoItem.path}`)
            }
          })
        })
      })
      return photoList
    }
  },
  methods: {
    imgLoad(e) {
      if (e.target.offsetHeight < e.target.offsetWidth) {
        e.target.style.width = 'auto'
        e.target.style.height = '100%'
      }
    },
    download(url) {
      window.open(`${url}?download`)
    },
    showModel(url) {
      this.previewImage = `${this.photoHost}${url}`
      this.previewVisible = true
    },
    reviewOrder() {
      this.loading = true
      Api.work.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.order = res.msg
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    createZip(type) {
      const photoData = type === 'first' ? this.photoQueue['firstArr'] : this.photoQueue['completeArr']
      const folder = type === 'first' ? '原片' : '成片'
      if (photoData.length === 0) { return this.$message.error(`未找到${folder}资源`) }
      let zip = new JsZip()
      let fold = zip.folder(folder)
      let transArr = []
      photoData.map((obj) => {
        transArr.push(utils.getRemoteImg(obj).then(res => {
          fold.file(`${moment().format('YYYY-MM-DD HH-mm-ss')}.png`, res, { base64: true })
        }))
      })
      Promise.all(transArr).then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
          utils.saveAs(content, `${folder} ${moment().format('YYYY-MM-DD HH-mm-ss')}.zip`);
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