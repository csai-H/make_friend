<!-- 主页面母版页头（标签导航栏）子组件 -->
<template>
  <fragment>
    <el-tabs style="height: 100%" ref="tabs" v-model="editableTabsValue" type="border-card" closable @tab-click="handleTabClick" @tab-remove="handleTabRemove">
      <el-tab-pane
        v-for="item in this.$store.state.editableTabs"
        :key="item.name"
        :name="item.name"
      >
        <span @contextmenu.prevent="RightClickMenu(item)" slot="label"><i :class="item.icon"></i> {{item.title}}</span>
      </el-tab-pane>
      <!-- 鼠标右键显示关闭菜单内容 -->
      <ul class="contextmenu" :style="`top:${menuPosition.y}px;left:${menuPosition.x}px`" v-show="menuShow">
        <li class="menu_item" @click="clickMenuItem(item.method)" v-for="item in menuContent" :key="item.title">
          {{ item.title }}
        </li>
      </ul>
      <!-- 路由视图对象 -->
      <router-view></router-view>
    </el-tabs>
  </fragment>
</template>

<script>
    export default {
      name: "TabNavBar",
      data() {
        return {
          /* tab标签绑定值，选中选项卡的 name */
          editableTabsValue: '',
          /* 鼠标右键菜单内容 */
          menuContent: [
            { title: '关闭', method: "menuClose" },
            { title: '关闭左侧', method: "menuCloseLeft" },
            { title: '关闭右侧', method: "menuCloseRight" },
            { title: '关闭其他', method: "menuCloseOther" },
          ],
          /* 控制右键菜单显示与否 */
          menuShow:false,
          /* 鼠标右键菜单位置 */
          menuPosition:{
            x:0,
            y:0
          },
          /* 点击的tab名称 */
          clickName: ''
        }
      },
      watch: {
        '$store.state.editableTabsValue':{
          handler(last,first) {
            this.editableTabsValue = last;
          }
        }
      },
      methods: {
        /* tab标签被选中时触发的事件*/
        handleTabClick(tab, event) {
          this.$store.commit("updateState",['activeMenu',tab.name]);
          this.$store.commit("updateState",['editableTabsValue',tab.name]);
          // 判断当前url地址和即将跳转的是否一致，不一致进行跳转，防止跳转多次
          if ('/'+tab.name+'' !== this.$route.path) {
            /* 进行路由跳转 */
            this.$router.push({path:tab.name})
          }
        },
        /* 右击鼠标显示菜单 */
        RightClickMenu(item){
          // 获取tabs列表dom元素
          let tabs = this.$refs.tabs;
          //获取tab列表的子dom列表
          let tabDom = tabs.$el.querySelectorAll('div[role=tab]');
          // 循环配置右击事件
          tabDom.forEach(e=>{
            //触发右击事件的方法
            e.oncontextmenu = (el) => {
              if (el.button === 2 && '/'+item.name+'' === this.$route.path) {
                //设置点击的tab名称 用于获取位置
                this.clickName = el.path[0].innerText.trim();
                // 去掉浏览器的默认行为
                el.preventDefault();
                // 获取鼠标的坐标，用于移动菜单位置
                this.menuPosition.x = el.clientX + 5 ;
                this.menuPosition.y = el.clientY;
                //显示右击菜单栏
                this.menuShow = true
              }
            }
          });

        },
        /* 鼠标右键菜单项点击事件 */
        clickMenuItem(method) {
          switch (method) {
            case 'menuClose':
              // 调用关闭方法
              this.menuClose();
              break;
            case 'menuCloseLeft':
              // 调用关闭左侧方法
              this.menuCloseLeft();
              break;
            case 'menuCloseRight':
              // 调用关闭右侧方法
              this.menuCloseRight();
              break;
            case 'menuCloseOther':
              // 调用关闭其他方法
              this.menuCloseOther();
              break;
          }
        },
        /* 右击菜单关闭功能 */
        menuClose(){
          this.handleTabRemove(this.editableTabsValue);
        },
        /* 右击菜单关闭左侧功能 */
        menuCloseLeft() {
          this.$store.state.editableTabs.find(e => {
            if (e.title !== this.clickName) {
              this.removeTab(e.name)
            }
            return e.title === this.clickName
          })
        },
        /* 右击菜单关闭右侧功能 */
        menuCloseRight() {
          this.$store.state.editableTabs.reverse().find(e => {
            if (e.title !== this.clickName) {
              this.removeTab(e.name)
            }
            return e.title === this.clickName
          })
        },
        /* 右击菜单关闭其他功能 */
        menuCloseOther() {
          this.$store.state.editableTabs.map(e => {
            if (e.title !== this.clickName) {
              this.removeTab(e.name)
            }
          })
        },
        /* 移除tab标签 */
        removeTab(targetName) {
          // 隐藏右击菜单
          this.hideMenu();
          this.$store.commit("removeTab",targetName);
        },
        /* 处理tab标签x按钮的移除 */
        handleTabRemove(targetName) {
          /* 1、从editableTabs中移除当前tab标签*/
          this.removeTab(targetName);
          /* 2、更改路由地址 */
          // 判断当前tabs列表中是否还有元素，有才进行以下操作，没有就不进行任何操作
          if (this.$store.state.editableTabs.length>0) {
            // 获取tab列表中的最后一个tab
            let lastTag = this.$store.state.editableTabs.slice(-1);
            // 更改路由地址
            // 判断当前url地址和即将跳转的是否一致，不一致进行跳转，防止跳转多次
            if ('/'+lastTag[0].name+'' !== this.$route.path) {
              /* 进行路由跳转 */
              this.$router.push({path:lastTag[0].name})
            }
            // 更改tab标签绑定值，选中选项卡的 name
            this.$store.commit("updateState",['editableTabsValue',lastTag[0].name]);
            // 更改当前激活的菜单
            this.$store.commit("updateState",['activeMenu',lastTag[0].name]);
          }
        },
        /* 隐藏鼠标右键菜单 */
        hideMenu() {
          this.menuShow = false
        }
      },
      beforeDestroy() {
        document.body.removeEventListener('click',this.hideMenu);
      },
      beforeMount() {
        // 初始化赋值
        this.editableTabsValue = this.$store.state.editableTabsValue;
      },
      mounted() {
        document.body.addEventListener('click',this.hideMenu);
      }
    }
</script>

<style lang="less" scoped>
  //右键菜单样式
  .contextmenu {
    position: fixed;
    top: 0;
    left: 0;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    transition: 0.3s;
    background-color: #fff;
    z-index: 100;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    /* 列表项样式 */
    .menu_item {
      margin: 0;
      padding: 7px 16px;
      /* 鼠标样式 */
      cursor: pointer;
      /* 悬停激活背景颜色 */
      &:hover {
        background: #eeeeee;
      }
    }
  }
</style>
