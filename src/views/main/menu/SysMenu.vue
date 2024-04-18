<!-- 菜单管理页面 -->
<template>
  <div>
    <!-- 1、新增按钮区域 -->
    <div style="display: flex;justify-content: flex-start">
      <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
    </div>
    <!-- 2、分隔线区域 -->
    <el-divider style="margin-top: 20px"></el-divider>
    <!-- 3、菜单表格区域 -->
    <el-table
      :data="menuTreeList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :default-expand-all="false"
      height="72vh"
      :tree-props="{children: 'children'}">
      <el-table-column
        prop="name"
        label="菜单名称"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="类型">
        <!--进行条件判断-->
        <template slot-scope="scope">
          <!--获取type属性，进行条件判断-->
          <el-tag v-if="scope.row.type===0">目录</el-tag>
          <el-tag type="success" v-else-if="scope.row.type===1">菜单</el-tag>
          <el-tag type="info" v-else>按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="icon"
        label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="perms" label="权限标识"/>
      <el-table-column align="center" prop="path" label="路由地址"/>
      <el-table-column align="center" prop="component" label="组件路径"/>
      <el-table-column align="center" prop="sortValue" label="排序"/>
      <el-table-column align="center" label="status" width="80">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status === 1" :disabled="true">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.type !== 2" icon="el-icon-plus" size="mini" title="添加下级节点"/>
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" :disabled="scope.row.children.length > 0"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    /* 引入菜单管理api接口 */
    import menu from '../../../api/menu/menu'
    export default {
      name: "SysMenu",
      data() {
        return {
          menuTreeList: []
        }
      },
      methods: {
        /* 获取菜单树 */
        async getMenuTree() {
          const { data } = await menu.getMenuTree();
          this.menuTreeList = data.data.result
        }
      },
      //当页面加载时获取数据
      created () {
        // 获取菜单树列表
        this.getMenuTree()
      }
    }
</script>

<style lang="less" scoped>
  /* 分隔线样式 */
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
  }

</style>
