import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HeyUI from '../heyui/index';
import titleConfig from './js/config/title-config';

require('../heyui/themes/common.less');
require('../static/css/doc.less');
import 'highlight.js/styles/github-gist.css';

import comHead from './components/common/header';
import comFoot from './components/common/footer';
import comFrame from './components/common/frame';
import example from './components/common/example';
import routerConfig from './js/config/router-config';
import VueHighlightJS from 'vue-highlightjs';
 
// Tell Vue.js to use vue-highlightjs 
Vue.use(VueHighlightJS)

Vue.use(VueRouter);
Vue.use(HeyUI);

Vue.component('com-head', comHead);
Vue.component('com-foot', comFoot);
Vue.component('com-frame', comFrame);
Vue.component('example', example);

let routerParam = {
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: (resolve) => require(['./components/home'], resolve)
  }, {
    path: '/component',
    name: 'component',
    component: (resolve) => require(['./components/component'], resolve),
    children:routerConfig.component
  }, {
    path: '/resource',
    name: 'resource',
    component: (resolve) => require(['./components/resource'], resolve)
  }, {
    path: '/about',
    name: 'about',
    component: (resolve) => require(['./components/about'], resolve)
  }, {
    path: '/guide',
    component: (resolve) => require(['./components/guide'], resolve),
    children:routerConfig.guide
  }]
};

const router = new VueRouter(routerParam);
router.beforeEach((to, from, next) => {
  if(titleConfig[to.name]){
    document.title = titleConfig[to.name] + ' - HEY UI';
  }else{
    document.title = 'HEY UI';
  }
  next();
})

const app = new Vue({
  router,
  el: '#app',
  render: h => h(App)
});