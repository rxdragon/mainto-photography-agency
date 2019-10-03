<template>
  <div id="addProduct">
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
          <a-input placeholder="填写产品名称" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">修图要求: </span>
        </a-col>
        <a-col :span="6">
          <a-textarea placeholder="请输入修图要求" :rows="4" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">样片素材: </span>
        </a-col>
        <a-col :span="22">
          <div class="clearfix">
            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange">
              <div>
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-col>
      </a-row>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
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
    }
  }
}
</script>
<style lang="less">
@import './style/addProduct.less';
</style>