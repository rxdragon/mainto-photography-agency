<template>
  <div class="product-select">
    <a-select v-model="productTypeData" :disabled="loading" style="width: 120px;">
      <a-select-option v-for="typeItem in productType" :key="typeItem.value">
        {{ typeItem.label }}
      </a-select-option>
    </a-select>

    <a-select
      show-search
      allowClear
      style="width: 100%;"
      :disabled="loading"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <a-select-option
        v-for="(productItem,  productIndex) in options"
        :key="productIndex"
        :value="productItem.value"
      >
        {{ productItem.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import * as CloudApi from '@/api/cloudApi'

const productType = []
for (const key in CloudApi.PRODUCT_TYPE) {
  productType.push({
    label: CloudApi.PriductName[CloudApi.PRODUCT_TYPE[key]],
    value: CloudApi.PRODUCT_TYPE[key]
  })
}

export default {
  name: 'ProductSelect',
  data () {
    return {
      productType,
      productData: {},
      productTypeData: CloudApi.PRODUCT_TYPE.BLUE,
      loading: true,
    }
  },
  computed: {
    options () {
      return this.productData[this.productTypeData] || []
    }
  },
  mounted () {
    this.getCloudProductApi()
  },
  methods: {
    /**
     * @description 获取云端产品
     */
    async getCloudProductApi () {
      try {
        this.loading = true
        this.productData = await CloudApi.getCloudProductApi()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.product-select {
  display: flex;
}
</style>
