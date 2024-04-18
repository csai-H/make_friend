<!-- 用户管理页面 -->
<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="内容"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="编号"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "SysUser",
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '张三',
            province: '上海',
            city: '普陀区',
            address: '视频做的非常好，一键三连',
            zip: 1
          }, {
            date: '2016-05-04',
            name: '李四',
            province: '上海',
            city: '普陀区',
            address: '有待加强，希望下次继续努力',
            zip: 2
          }, {
            date: '2016-05-01',
            name: '王五',
            province: '上海',
            city: '普陀区',
            address: '飞洒地方撒旦飞洒地方阿萨法十大',
            zip: 3
          }, {
            date: '2016-05-03',
            name: '赵六',
            province: '上海',
            city: '普陀区',
            address: '法撒旦发射点阿斯蒂芬士大夫士大夫十大',
            zip: 4
          }]
        }
      },
      methods: {
        handleClick(row) {
          console.log(row);
        }
      }
    }
</script>

<style scoped>

</style>
