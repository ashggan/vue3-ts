import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ToDo from "@/views/Todo.vue";
import JobDetail from "@/components/job/jobDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/todo",
      name: "Todo",
      component: ToDo,
    },
    {
      path: "/jobs/:id",
      name: "Job-detail",
      component: JobDetail,
      props: true,
    },
  ],
});

export default router;
