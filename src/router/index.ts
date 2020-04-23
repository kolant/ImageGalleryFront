import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import GalleryDetailComponent from "@/views/gallery/components/gallery-detail/gallery-detail.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/gallery/:pictureId",
      name: "GalleryDetail",
      component: GalleryDetailComponent
    }
    // {
    //   path: "/about",
    //   name: "About",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
];

const router = new VueRouter({
  routes
});

export default router;
