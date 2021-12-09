/*
 * @page: 
 * @Author: Orts
 * @Date: 2021-12-09 09:37:00
 * @LastEditTime: 2021-12-09 09:41:49
 * @LastEditors: Orts
 * @Description: 
 * @FilePath: /vue/xlsx-in-vue3/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App);
app.use(ElementPlus).mount('#app');
