import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Choice from '@/components/Choice'
import Create from '@/components/Create'
import List from '@/components/List'
import Study from '@/components/Study'
import Summary from '@/components/Summary'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Home',component: Home},
    {path: '/create',name: 'Create',component: Create},
    {path: '/choice',name: 'Choice',component: Choice},
    {path: '/list',name: 'List',component: List},
    {path: '/study/:id',name: 'Study ',component: Study},
    {path: '/summary',name: 'Summary',component: Summary}
  ]
})
