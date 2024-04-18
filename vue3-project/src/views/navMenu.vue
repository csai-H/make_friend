<script setup>
import {ref} from 'vue'
const isCollapse = ref(true)
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

let asidelist = ref([
    {id:1,title:'首页', icon:Document},
    {id:2,title:'搭伙', icon:Location},
    {id:3,title:'计划', icon:Document},
    {id:5,title:'景点', icon:Document},
    {id:6,title:'动态', icon:Setting},
    {id:7,title:'消息', icon:Document},

])
</script>

<template>
<el-aside width="5px" class="aside">
    <div class="aside-list">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
    >
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="false" v-show="isCollapse">|||</el-radio-button>
        <el-radio-button :value="true" v-show="!isCollapse">|||</el-radio-button>
    </el-radio-group>
    <el-menu-item index="v.id" v-for="v in asidelist" :key="v.id">
        <el-icon><component :is="v.icon"></component></el-icon>
        <template #title>{{ v.title }}</template>
        </el-menu-item>
    </el-menu>
    </div>
</el-aside>
  
</template>
 
<style scoped>


</style>
