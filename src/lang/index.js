import Vue from 'vue'
import Element from 'element-ui';
import VueI18n from 'vue-i18n';

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
  en: {
    ego: {
      product: 'Product Management',
      params: 'Specification',
      advert: 'Advertising',
      about: 'Personal Center',
      name: 'EGO Management System',
      language: 'Language Selection',
      holle: 'Holle',
      chaxun: 'Query',
      add: 'Add',
      editor: 'Editor',
      delete: 'Delete',
      batch: 'Batch delete',
      deselect: 'Deselect',
    },
    ...enLocale
  },
  zh: {
    ego: {
      product: '商品管理',
      params: '规格参数',
      advert: '广告分类',
      about: '个人中心',
      name: '易购后台管理系统',
      language: "选择语言",
      holle: '欢迎',
      chaxun: '查询',
      add: '添加',
      editor: '编辑',
      delete: '删除',
      batch: '批量删除',
      deselect: '取消选择',
    },
    ...zhLocale
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages, // 设置地区信息
})
Element.i18n((key, value) => i18n.t(key, value))

// 通过 `i18n` 选项创建 Vue 实例
export default i18n
