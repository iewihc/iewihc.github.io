import Vue from 'vue'
Vue.component("demo-component", () => import("D:\\im\\vuepress-theme-blog\\example\\.vuepress\\components\\demo-component"))
Vue.component("OtherComponent", () => import("D:\\im\\vuepress-theme-blog\\example\\.vuepress\\components\\OtherComponent"))
Vue.component("Foo-Bar", () => import("D:\\im\\vuepress-theme-blog\\example\\.vuepress\\components\\Foo\\Bar"))
Vue.component("BaseListLayout", () => import("D:\\im\\vuepress-theme-blog\\global-components\\BaseListLayout"))
Vue.component("BlogTag", () => import("D:\\im\\vuepress-theme-blog\\global-components\\BlogTag"))
Vue.component("NavLink", () => import("D:\\im\\vuepress-theme-blog\\global-components\\NavLink"))
Vue.component("BlogTags", () => import("D:\\im\\vuepress-theme-blog\\global-components\\BlogTags"))


export default {}