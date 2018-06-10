// require.ensure 是 Webpack 的特殊语法，用来设置 组件到底路径
/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */
const routers = [{
  path: '/',
  name: 'index',
  component(resolve) {
    require.ensure(['./App.vue'], () => {
      resolve(require('./App.vue'));
    });
  },
  children: [
    {
      path: '/lovely',
      name: 'lovely',
      component(resolve) {
        require.ensure(['./components/welfare/lovely.vue'], () => {
          resolve(require('./components/welfare/lovely.vue'));
        });
      }
    }, {
      path: '/day',
      name: 'day',
      component(resolve) {
        require.ensure(['./components/recommend/recommend.vue'], () => {
          resolve(require('./components/recommend/recommend.vue'));
        });
      },
      meta: {requiresAuth: true}
    }, {
      path: '/daily',
      name: 'daily',
      component(resolve) {
        require.ensure(['./components/lists/daily.vue'], () => {
          resolve(require('./components/lists/daily.vue'));
        });
      }
    }
  ]
}, {
  path: '/wecome',
  name: 'wecome',
  component(resolve) {
    require.ensure(['./components/wecome/wecome.vue'], () => {
      resolve(require('./components/wecome/wecome.vue'));
    });
  }
}];

export default routers;
