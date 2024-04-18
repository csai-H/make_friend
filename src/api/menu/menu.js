/* 引入axios实例 */
import request from '../../utils/request'

/* 菜单管理相关的API请求路径 */
const api_path = '/admin/system/menu';

export default {
  /**
   * 获取树形菜单
   */
  getMenuTree() {
    return request({
      method:'get',
      url:`${api_path}/getMenuTree`
    })
  }
}
