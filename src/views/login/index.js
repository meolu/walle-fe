const Login = () => import('./src/login.vue')

export default function (router) {
  router.push({
    path: '/login',
    name: 'Login',
    component: Login
  })
}
