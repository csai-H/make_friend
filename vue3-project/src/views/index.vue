<script setup>
import {ref} from 'vue'
import NavMenu from './navMenu.vue'
import Header from './headerNav.vue'
import Recommend from './recommend.vue'


</script>

<template>
  <div class="common-layout">
    <el-container>
         <!-- 左侧导航栏 -->
      <NavMenu />
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <Recommend />
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped>


</style>
