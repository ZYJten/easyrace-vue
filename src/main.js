import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import '@/assets/icon/iconfont'
import '@/assets/fonts/style.css'
// import Moment from 'moment'
// import ElTableBar from 'el-table-bar-base'
// import 'el-table-bar-base/lib/ElTableBar.css'
import echarts from 'echarts'
import axios from "axios";
// import { ElScrollbar } from 'element-plus' // 必须引入 Scrollbar 组件才能正常使用

const app = createApp(App)
// app.prototype.$echarts = echarts

installElementPlus(app)
app.use(store).use(router).use(echarts).mount('#app')

