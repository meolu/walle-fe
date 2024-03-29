import Vue from 'vue'
// import App from '../App'
import Layout from '@/layout'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import Project from '@/views/project'
import Task from '@/views/task'
import Space from '@/views/space'
import Myself from '@/views/myself'

Vue.use(Router)

const routes = []

const rootRouter = {
  path: '/',
  children: [],
  component: Layout
}

// 重定向路由
const redirectRoute = {
  path: '*',
  redirect: '/'
}

Login(routes)
Myself(routes)
Home(rootRouter.children)
User(rootRouter.children)
Project(rootRouter.children)
Task(rootRouter.children)
Space(rootRouter.children)

const mode = 'history'
export default new Router({
  mode: mode,
  routes: routes.concat(rootRouter, redirectRoute)
})
