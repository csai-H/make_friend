<script setup>
import { ref } from 'vue'

let bannerlist = ref([
    { id: 1, img_url: 'project-1.jpg' },
    { id: 2, img_url: 'project-2.jpg' },
    { id: 3, img_url: 'project-3.jpg' },
    { id: 4, img_url: 'project-4.jpg' },
])
</script>

<template>
<div class="banner">
    <el-carousel height="620px">
      <el-carousel-item v-for="item in bannerlist" :key="item.id">
        <img :src="`/images/${item.img_url}`" alt="">
      </el-carousel-item>
    </el-carousel>
</div>

</template>

<style scoped></style>
