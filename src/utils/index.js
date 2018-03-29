import { baseUrl } from '@/config/env'
/**
 * 是否有权限
 * @param {*}permission
 */
export function hasPermission (permission) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(permission) !== -1 || false
}

/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl (url) {
  let val = /.*\/(.*)\.html/.exec(url)
  return val && val.length >= 1 ? val[1] : ''
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 获取字符串字节长度
 * @param {*} s
 */
export function getStringLength (s) {
  return s.replace(/[\u4e00-\u9fa5\uff00-\uffff]/g, '**').length
}

/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? `${title}`+'--krt-admin 通用后台管理系统' : 'krt-admin 通用后台管理系统';
  window.document.title = title;
};

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url;
  if (url.indexOf("http") != -1 || url.indexOf("https") != -1) {
      reqUrl = `/iframe/urlPath?src=${reqUrl}&name=${name}`;
  } else {
      reqUrl = `${reqUrl}`;
  }
  return reqUrl;
}

/**
* 总体路由设置器
*/
export const setUrlPath = ($route) => {
  let value = "";
  if ($route.query.src) {
      value = $route.query.src;
      if (value.indexOf(baseUrl) != -1) {
          const port = value
              .substr(value.lastIndexOf(":"))
              .replace(value.substr(value.lastIndexOf("/")), "");
          const path = value.replace(baseUrl + port, "");
          value = "#" + path + port;
      }
  } else {
      value = $route.path;
  }
  return value;
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
      exitFullScreen();
  } else {
      reqFullScreen();
  }
}

/**
* 浏览器判断是否全屏
*/
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
      window.fullScreen ||
      document.mozFullscreenEnabled ||
      document.webkitIsFullScreen;
  return isFullscreen;
}

/**
* 浏览器全屏
*/
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
  }
}
/**
* 浏览器退出全屏
*/
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
      document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
      document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
      document.mozCancelFullScreen();
  }
}