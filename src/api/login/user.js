/* 引入axios实例 */
import request from '../../utils/request'

export default {
  /* 登录接口 */
  login(vo) {
    return request({
      method: 'get',
      url: '/admin/system/menu/getMenuTree',
    });
  }
}
