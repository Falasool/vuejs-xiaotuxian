<script setup>
import { getHotGoodsAPI } from '@/apis/detail'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

// 设计props参数，适配不同的title和数据

const props = defineProps({
  hotType: {
    type: Number
  }
})
const TYPEMAP = {
  1: '24h热榜',
  2: '周热榜'
}
const title = computed(() => TYPEMAP[props.hotType])

const route = useRoute()
const hotList = ref([])

const getHotList = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType
  })
  hotList.value = res.result
}
onMounted(() => {
  getHotList()
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in 3" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">一双男鞋</p>
      <p class="desc ellipsis">一双好穿的男鞋</p>
      <p class="price">&yen;200.00</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
