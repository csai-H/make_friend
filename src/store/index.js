/* vuex部分 */
import Vue from 'vue'
import Vuex from 'vuex'
/* 引入vuex持久化插件 */
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  /* vuex持久化插件 */
  plugins: [persistedState(
    {
      // 默认位置是 localStorage
      storage: window.sessionStorage,
      reducer: (state) => {
        return {
          // 默认是全部缓存，只储存state中的activeMenu，editableTabsValue以及editableTabs
          activeMenu: state.activeMenu,
          editableTabsValue: state.editableTabsValue,
          editableTabs: state.editableTabs,
        }
      }
    }
  )],
  // 数据，相当于data
  // 使用方法 this.$store.state.全局数据名称
  state: {
    /* 当前激活菜单的 index */
    activeMenu: 'homePage',
    /* 绑定值，选中选项卡的 name */
    editableTabsValue: 'homePage',
    /* tab标签选项卡内容 */
    editableTabs: [
      {
        title: '首页',
        name: 'homePage',
        content: '首页',
        icon: 'el-icon-menu'
      }
    ]
  },
  // 定义方法，用以操作state
  // 注意：使用commit触发Mutation操作
  // 如：this.$store.commit("mutations中定义的方法名",参数)
  mutations: {
    /**
     * 修改state中数据的方法
     * @param state 当前页面的state属性
     * @param name 需要修改的属性名
     * @param value 修改值
     */
    updateState(state, [name, value]) {
      state[name] = value
    },
    /* 动态添加tab标签 */
    addTab(state, item) {
      const newTab = {
        title: item.meta.title,
        name: item.path,
        content: item.meta.title,
        icon: item.meta.icon
      };
      // 判断当前editableTabs中是否存在该tab标签
      if (state.editableTabs.findIndex(item => item.title === newTab.title) === -1) {
        state.editableTabs.push(newTab);
        state.editableTabsValue = newTab.name;
        state.activeMenu = newTab.name;
      }

    },
    /* 移除tab标签 */
    removeTab(state, targetName) {
      let tabs = state.editableTabs;
      let activeName = state.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      state.activeMenu = activeName;
      state.editableTabsValue = activeName;
      state.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  // 定义方法，使用异步操作
  // Action和Mutation相似，Mutation 不能进行异步操作，若要进行异步操作，就得使用Action
  // 直接使用  dispatch触发Action函数 :this.$store.dispatch("方法名",参数)
  actions: {},
  // 当遇见大型项目时，数据量大，store就会显得很臃肿
  // 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。
  // 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——
  // 从上至下进行同样方式的分割
  modules: {}
})
