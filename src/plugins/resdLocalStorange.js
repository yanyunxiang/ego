import store from '../store'
import router from '../router'
let user = localStorage.getItem('userInfo')
if (user) {
  store.commit('loginModule/setUserInfo', JSON.parse(user))
}
router.beforeEach((to, from, next) => {
  if (to.matched.length > 0 && !to.matched.some(record => record.meta.isLogined)) {
    next()
  } else {
    // 需要登录
    let token = store.state.loginModule.userInfo.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
