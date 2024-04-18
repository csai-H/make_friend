<!-- 系统框架视图对象（顶部菜单栏 + 侧边栏 + 主页面） -->
<template>
  <div>
    <el-container>
      <!-- 一、顶部菜单栏部分 -->
      <el-header height="10vh">
        <!-- 1.1 系统Logo -->
        <img src="../../assets/img/add_friends.png">
        <!-- 1.2 用户登录区域 -->
        <div class="login_user">
          <!-- 1.2.1 用户头像 -->
          <img src="../../assets/img/user (1).png">
          <!-- 1.2.2 登录按钮 -->
          <div class="user_btn">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>账户设置</el-dropdown-item>
                <el-dropdown-item>待办事项</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-link type="danger" style="font-size: 16px">退出登录</el-link>
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 二、侧边栏区域 -->
        <el-aside width="content-box">
          <!-- 1、汉堡按钮（展开收起菜单项功能）-->
          <div class="toggle_box" @click="toggleClick">
            <img v-if="isCollapse" src="../../assets/img/收起菜单.svg">
            <img v-else src="../../assets/img/展开菜单.svg">
          </div>
          <!-- 2、 菜单项区域 -->
          <el-menu :default-active="this.$store.state.activeMenu"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   @select="handleSelect"
                   text-color="#000000"
                   active-text-color="#25CDCD"
                   :router="true"
                   :collapse="isCollapse">

            <MenuTree :menuList="menuList"></MenuTree>
          </el-menu>
        </el-aside>
        <!-- 三、主页面区域 -->
        <el-main>
          <!-- 主页面母版页头（标签导航栏） -->
          <TabNavBar></TabNavBar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  /* 引入菜单管理api接口 */
  import menu from '../../api/menu/menu'
  /* 引入菜单树子组件 */
  import MenuTree from "../../components/menu/MenuTree";
  /* 引入标签导航栏子组件 */
  import TabNavBar from "../../components/tab/TabNavBar";

export default {
name: 'Sesame',
components: {
/* 注册组件 */
MenuTree: MenuTree,
TabNavBar:TabNavBar
},
data () {
return {
/* 汉堡按钮是否折叠 */
isCollapse: false,
/* 菜单列表 */
menuList: [
{
id: 1,
name: 'homePage',
path: 'homePage',
meta: {
title: '首页',
icon: 'el-icon-menu'
},
children: []
},
{
id: 2,
path: '/system',
meta: {
title: '消息中心',
icon: 'el-icon-s-tools'
},
alwaysShow: true,
children: [
{
id: 3,
name: 'sysUser',
path: 'sysUser',
meta: {
 title: '回复我的',
 icon: 'el-icon-s-custom'
},
children: []
},
{
id: 4,
path: 'sysRole',
 meta: {
title: '收到的赞',
icon: 'el-icon-s-help'
},
children: []
},
{
id: 5,
name: 'sysMenu',
path: 'sysMenu',
meta: {
 title: '系统通知',
 icon: 'el-icon-s-unfold'
},
children: []
},
{
id: 6,
name: 'sysDept',
path: 'sysDept',
meta: {
 title: '我的消息',
 icon: 'el-icon-s-home'
},
children: []
},
{
id: 7,
 name: 'sysPost',
 path: 'sysPost',
 meta: {
 title: '@我的',
 icon: 'el-icon-menu'
 },
 children: []
},

]
}
],
}
},
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        /* 菜单激活回调函数 */
        handleSelect(key, keyPath) {
          this.$store.commit("updateState",['editableTabsValue',key]);
          this.$store.commit("updateState",['activeMenu',key]);
        },
        /* 汉堡按钮点击事件（展开和关闭侧边栏 ）*/
        toggleClick() {
          this.isCollapse = !this.isCollapse;
        },
        /* 获取菜单树 */
        async getMenuTree() {
          const { data } = await menu.getMenuTree();
          this.menuList = data.data.result
        }
      },
      created() {
        /* 页面加载时调用获取菜单树的方法 */
        this.getMenuTree()
      }
  }
</script>

<style lang="less" scoped>
  /* 顶部菜单栏样式 */
  .el-header {
    background-color: #001529;
    color: #333;
    padding: 0;
    text-align: left;
    /* 居中显示 */
    line-height: 10vh;

    /* 系统logo样式 */
    img{
      width: 10vh;
      height: 10vh;
      border-radius: 50%;
    }

    /* 用户登录区域 */
    .login_user{
      width: 320px;
      float: right;
      display: flex;
      justify-content: space-evenly;
    }

    /* 用户按钮样式 */
    .user_btn{
      width: 50%;
      display: flex;
      justify-content: space-between;

      /* 下拉菜单样式 */
      .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 16px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }

  /* 侧边栏区域样式 */
  .el-aside {
    background-color: #FFFFFF;
    text-align: left;
    height: 90vh;

    /* 汉堡按钮样式 */
    .toggle_box{
      background-color: #d9d9d9;
      text-align: center;
      /* 设置鼠标样式 */
      cursor: pointer;

      img {
        height: 30px;
        width: 30px;
      }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 170px;
      overflow: hidden;
    }
  }

  /* 主页面样式 */
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 90vh;
    overflow: hidden;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


</style>
