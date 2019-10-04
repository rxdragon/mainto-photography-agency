<template>
  <div id='upload'>
    <!-- 照片上传 -->
    <div class="upload">
      <div class="clearfix">
        <ul class="ant-upload-list ant-upload-list-picture-card" v-for="(item, index) in imgList" :key="index">
          <li class="list-wrap">
            <div class="ant-upload-list-item ant-upload-list-item-done">
              <div class="ant-upload-list-item-info">
                <img :src="item.response.url" style="height: 220px;">
              </div>
              <span class="ant-upload-list-item-actions" style="top: 120px">
                <i class="anticon anticon-eye-o" @click="previewPicture(item.response.url)"> <a-icon type="eye" /></i>
                <i class="anticon anticon-delete" @click="deletePicture(item, index)"><a-icon type="delete" /></i>
              </span>
            </div>
            <p class="picture-name">{{`文件名: ${item.name}`}}</p>
            <p class="picture-count">
              选择人数:
              <a-input-number
                style="width: 68%;"
                :min="0" 
                :max="99"
                v-model="count"
                :formatter="value => `${value} 人`" 
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
              />
            </p>
            <p class="picture-product">
              选择产品:
              <a-select 
                placeholder="请选择产品类型" 
                v-model="productValue" 
                style="width: 68%"
                @change="productChange(item)
              ">
                <a-select-option value="123">证件照</a-select-option>
                <a-select-option value="345">花颜照</a-select-option>
                <a-select-option value="456">全家福</a-select-option>
              </a-select>
            </p>
            <p class="picture-product">
              <a-select placeholder="拼接类型" style="width: 55%" v-model="spliceValue" @change="spliceChange(item)">
                <a-select-option v-for="(item, index) in splitArray" :key="index" :value="item">{{item}}</a-select-option>
              </a-select>
              <a-input-number tyle="width: 40%; margin-left: 4%;" :min="1" :max="99" v-model="splitIndex" placeholder="拼接序号" />
            </p>
          </li>
        </ul>
        <a-upload :action="upyunAction" :data="getUpyun" listType="picture-card" @change="handleChange" :showUploadList="false">
          <div>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
        {{upyunAction}}
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'upload',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      imgList: [],
      count: 0,
      splitIndex: '',
      splitArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      loading: false,
      productValue: undefined,
      spliceValue: undefined,
    }
  },
  computed: {
    ...mapGetters(['getUpyun']),
    upyunAction () {
      return `https://v0.api.upyun.com/${this.getUpyun.bucket}`
    }
  },
  methods: {
    deletePicture(picture, index) {
      this.imgList.splice(index, 1)
    },
    previewPicture(url) {
      this.previewImage = url
      this.previewVisible = true
    },
    productChange(item) {
      item.product_id = this.productValue
    },
    spliceChange(item) {
      item.splice_mark = this.spliceValue
    },
    handleCancel() {
      this.previewVisible = false
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList
      if (file.status === 'uploading') {
        this.loading = true
      } else if (file.status === 'done') {
        this.imgList.push(Object.assign(file, {
          people_num: '',
          splice_mark: '',
          splice_position: '',
          product_id: ''
        }))
        this.loading = false
      }
    },
  },
}
</script>
<style lang="less">
@import '../style/index.less';
</style>