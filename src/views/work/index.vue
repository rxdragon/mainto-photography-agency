<template>
  <div id="work">
    <section class="content">
      <!-- 照片上传 -->
      <div class="upload">
        <h4><span class="line" /><span>发布照片</span></h4>
        <a-alert v-if="visible" message="温馨提示" description="1、若要进行照片拼接，需选择标签对照片标记；如标签“拼接A”先后标记了照片1、2，则表示这两张照片需先后被拼接在一起" type="info" closable :after-close="handleClose" :style="{textAlign: 'left', marginBottom: '24px'}" />
        <Upload ref="uploadChild" @loading="sendLoding" @sendPhotos="getPhotos" />
      </div>
      <!-- 临时额外信息 -->
      <div class="temporary-info" v-if="isTemporaryAccount">
        <h4><span class="line" /><span>临时产品信息</span></h4>
        <a-col :span="24" class="child-item">
          <span class="title">产品信息: </span>
          <product-select ref="productSelect" style="width: 80%;" placeholder="请选中产品" :value="temporaryInfo.temporaryProduct" @change="onTemporaryProductChange" />
        </a-col>
        <a-col :span="24" class="child-item">
          <span class="title">订单号: </span>
          <a-input v-model.trim="temporaryInfo.orderNum" placeholder="请输入订单号" style="width: 80%;" />
        </a-col>
        <a-col :span="24" class="child-item">
          <span class="title">门店名: </span>
          <a-input v-model.trim="temporaryInfo.storeName" placeholder="请输入门店名" style="width: 80%;" />
        </a-col>
        <a-col :span="24" class="child-item">
          <span class="title">摄影师: </span>
          <a-input v-model.trim="temporaryInfo.photographer" placeholder="请输入摄影师" style="width: 80%;" />
        </a-col>
        <a-col :span="24" class="child-item">
          <span class="title">上传人: </span>
          <a-input v-model.trim="temporaryInfo.uploader" placeholder="请输入上传人信息" style="width: 80%;" />
        </a-col>
      </div>
      <!-- 订单信息 -->
      <div class="order-info">
        <h4><span class="line" /><span>订单信息</span></h4>
        <a-row>
          <a-col :span="24" class="child-item">
            <span class="title">顾客姓名: </span>
            <a-input v-model.trim="orderInfo.name" placeholder="请输入顾客姓名" style="width: 80%;" />
          </a-col>
          <a-col :span="24" class="child-item">
            <span class="title">订单标题: </span>
            <a-input v-model.trim="orderInfo.title" placeholder="请输入订单标题" style="width: 80%;" />
          </a-col>
        </a-row>
      </div>
      <!-- 修图要求 -->
      <div class="order-info">
        <h4><span class="line" /><span>修图要求</span></h4>
        <a-row class="child-item">
          <span class="title">眼睛增幅: </span>
          <a-radio-group v-model="orderInfo.claim.eyes">
            <a-radio :value="'big'">大</a-radio>
            <a-radio :value="'middle'">中</a-radio>
            <a-radio :value="'small'">小</a-radio>
            <a-radio :value="'not_required'">无</a-radio>
          </a-radio-group>
        </a-row>
        <a-row class="child-item">
          <span class="title">瘦脸幅度: </span>
          <a-radio-group v-model="orderInfo.claim.face">
            <a-radio :value="'big'">大</a-radio>
            <a-radio :value="'middle'">中</a-radio>
            <a-radio :value="'small'">小</a-radio>
            <a-radio :value="'not_required'">无</a-radio>
          </a-radio-group>
        </a-row>
        <a-row class="child-item">
          <span class="title">是否祛痣: </span>
          <a-radio-group v-model="orderInfo.claim.pimples">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-row>
        <a-row class="child-item">
          <a-col :span="24">
            <span class="title">修图备注: </span>
            <a-input v-model.trim="orderInfo.retouchNote" placeholder="请输入修图备注" style="width: 80%;" />
          </a-col>
        </a-row>
      </div>
      <!-- 取片日期 -->
      <div class="order-info">
        <h4><span class="line" /><span>取片日期</span></h4>
        <a-row class="child-item">
          <a-radio-group v-model="orderInfo.takeTime" :style="{ width: '100%' }">
            <a-radio :value="'today'">当日取片</a-radio>
            <a-radio :value="'tomorrow'">隔日取片</a-radio>
            <a-radio :value="'other_day'">择日取片</a-radio>
          </a-radio-group>
        </a-row>
      </div>
    </section>
    <section class="footer">
      <a-button type="primary" @click="submitCloud">提交云端</a-button>
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import Upload from './components/Upload.vue'
import * as PhotoTool from '@/util/photoTool'
import ProductSelect from '@/components/SelectComponents/ProductSelect'
import { mapGetters } from 'vuex'

export default {
  name: 'Work',
  components: { Upload, ProductSelect },
  data () {
    return {
      photoList: [],
      submit: false,
      visible: true,
      temporaryInfo: {
        temporaryProduct: undefined, // 临时产品
        orderNum: '', // 海马体订单号
        storeName: '', // 门店名字
        photographer: '', // 摄影师
        uploader: '', // 上传人
      },
      orderInfo: {
        title: '',
        name: '',
        retouchNote: '',
        takeTime: '',
        claim: {
          eyes: 0,
          face: 0,
          pimples: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    // 是否是临时账号
    isTemporaryAccount () {
      const nickName = _.get(this.getUser, 'nick') || ''
      return nickName.includes('临时')
    },
    params () {
      return {
        title: this.orderInfo.title,
        customerName: this.orderInfo.name,
        retouchNote: this.orderInfo.retouchNote,
        takeTime: this.orderInfo.takeTime,
        photoData: this.photoList,
        retouchClaim: {
          eye: this.orderInfo.claim.eyes,
          face: this.orderInfo.claim.face,
          pimples: this.orderInfo.claim.pimples
        }
      }
    }
  },
  methods: {
    handleClose () {
      this.visible = false
    },
    getPhotos (photos) {
      this.photoList = []
      photos.map((item) => {
        this.photoList.push({
          productId: item.product_id && item.product_id + '',
          path: PhotoTool.handlePicPath(item.response.url),
          peopleNum: String(item.people_num),
          spliceMark: item.splice_mark,
          splicePosition: item.splice_position,
          type: Boolean(item.splice_position) === true ? 'splice' : 'normal'
        })
      })
    },
    /**
     * @description 当临时产品变更
     */
    onTemporaryProductChange (value) {
      this.temporaryInfo.temporaryProduct = value
    },
    /**
     * @description 验证参数
     */
    emptyParams () {
      for (const item in this.params) {
        if (!this.params[item]) return false
      }
      if (!this.params.retouchClaim.eye) return false
      if (!this.params.retouchClaim.face) return false
      const hasPimples = typeof this.params.retouchClaim.pimples === 'boolean'
      if (!hasPimples) return false
      for (const photo of this.params.photoData) {
        if (!Number(photo.peopleNum) && Number(photo.peopleNum) !== 0) return false
        if (!photo.productId || !photo.peopleNum) return false
      }
      if (this.isTemporaryAccount) {
        for (const item in this.temporaryInfo) {
          if (!this.temporaryInfo[item]) return false
        }
      }
      return true
    },
    async submitCloud () {
      const isAllFinish = this.$refs.uploadChild.getChildPhotos()
      if (!isAllFinish) return
      // TODO: 后续增补Verification模块
      if (!this.emptyParams()) return this.$message.error('请填写完整信息')
      this.$emit('loading', true)
      const req = JSON.parse(JSON.stringify(this.params))
      // 针对临时账号处理
      if (this.isTemporaryAccount) {
        const temporaryInfoValues = Object.values(this.temporaryInfo)
        const newTitle = temporaryInfoValues.join('|')
        req.title = `${newTitle}|${req.title}`
        req.retouchNote = `${this.temporaryInfo.temporaryProduct}|${req.retouchNote}`
      }
      Api.work.add(req).then(() => {
        this.$message.success('订单提交成功', 2, () => {
          this.$refs.uploadChild.fileList = []
          this.$refs.uploadChild.resetshaList()
          this.orderInfo = {
            title: '',
            name: '',
            retouchNote: '',
            takeTime: '',
            claim: {
              eyes: 0,
              face: 0,
              pimples: ''
            }
          }
          this.temporaryInfo = {
            temporaryProduct: undefined, // 临时产品
            orderNum: '', // 海马体订单号
            storeName: '', // 门店名字
            photographer: '', // 摄影师
            uploader: '', // 上传人
          }
          this.$emit('loading', false)
        })
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
        this.$emit('loading', false)
      })
    },
    sendLoding (state) {
      this.$emit('loading', state)
    }
  }
}
</script>
<style lang="less" scoped>
@import './style/index.less';
</style>
