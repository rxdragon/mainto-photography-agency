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
#addProduct {
    .title {
        text-align: left;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;

    }

    .form {
        margin-top: 20px;
        text-align: left;

        .item {
            margin-bottom: 40px;
        }

        .tip.name {
            height: 32px;
            line-height: 32px;
        }

        .tip {
            display: inline-block;
        }

        .ant-upload-list-picture-card {
            .ant-upload-list-item-uploading-text {
                text-align: center;
                margin-top: 100px;
            }
        }

        .ant-upload.ant-upload-select-picture-card {
            width: 220px;
            min-height: 220px;

            .ant-upload-btn {
                width: 100%;
                height: 100%;
                display: table-cell;
                text-align: center;
                vertical-align: middle;
                padding: 8px;
            }

            .ant-upload-text {
                margin-top: 8px;
                color: #666;
            }
        }

        .ant-upload-list-picture-card {
            .ant-upload-list-item {
                width: 220px;
                min-height: 220px;
            }
        }
    }
}
</style>