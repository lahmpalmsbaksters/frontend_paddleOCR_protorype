import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _71a343ee = () => interopDefault(import('../pages/chooseImage.vue' /* webpackChunkName: "pages/chooseImage" */))
const _612620e3 = () => interopDefault(import('../pages/face.vue' /* webpackChunkName: "pages/face" */))
const _6e111174 = () => interopDefault(import('../pages/gaugedetect.vue' /* webpackChunkName: "pages/gaugedetect" */))
const _58171a6d = () => interopDefault(import('../pages/genderclassification.vue' /* webpackChunkName: "pages/genderclassification" */))
const _19413095 = () => interopDefault(import('../pages/people.vue' /* webpackChunkName: "pages/people" */))
const _f748d74e = () => interopDefault(import('../pages/url.vue' /* webpackChunkName: "pages/url" */))
const _009a3c88 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chooseImage",
    component: _71a343ee,
    name: "chooseImage"
  }, {
    path: "/face",
    component: _612620e3,
    name: "face"
  }, {
    path: "/gaugedetect",
    component: _6e111174,
    name: "gaugedetect"
  }, {
    path: "/genderclassification",
    component: _58171a6d,
    name: "genderclassification"
  }, {
    path: "/people",
    component: _19413095,
    name: "people"
  }, {
    path: "/url",
    component: _f748d74e,
    name: "url"
  }, {
    path: "/",
    component: _009a3c88,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
