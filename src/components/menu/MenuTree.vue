<!-- 菜单树子组件 -->
<template>
  <fragment>
    <template v-for="item in menuList">
      <el-submenu :key="item.id" :index="item.id+''" v-if="item.children.length>0">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <MenuTree :menuList="item.children"></MenuTree>
      </el-submenu>
      <el-menu-item v-else :key="item.id" :index="item.path+''" @click="addTab(item)">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
    export default {
      name: "MenuTree",
      props:["menuList"],
      methods: {
        /* 添加导航标签  */
        addTab(item) {
          this.$store.commit('addTab',item)
        }
      }
    }
</script>

<style scoped>

</style>
