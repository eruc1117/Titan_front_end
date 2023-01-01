import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import resetPassword from "../views/resetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
      beforeEnter: async (to, from, next) => {
        try {
          let isRouterAuth = localStorage.getItem("routerAuth");
          if (!isRouterAuth) {
            let authRes = await routerAuth();
            localStorage.setItem("routerAuth", authRes === "success");
          }
          if (isRouterAuth === "true") {
            next();
          } else {
            next({ name: "login" });
          }
        } catch (err) {
          console.log(err);
        }
        async function routerAuth() {
          try {
            const basicUrl = "http://localhost:3000";
            const jwtToken = localStorage.getItem("token");
            let routerAuthRes = await fetch(
              `${basicUrl}/account/froontEndRouter`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );
            routerAuthRes = await routerAuthRes.json();
            return routerAuthRes.message;
          } catch (err) {
            console.log(err);
          }
        }
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: resetPassword,
    },
  ],
});

export default router;
