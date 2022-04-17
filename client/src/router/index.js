import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  	{
  	  	path: "/",
  	  	name: "Home",
  	  	component: HomeView,
  	  	props: true,
  	},
  	{
  	  	path: "/login",
  	  	name: "Login",
  	  	component: LoginView,
  	  	props: true,
  	},
	{
		path: "/register",
		name: "Register",
		component: RegisterView,
		props: true
	}
];

const router = createRouter({
  	history: createWebHistory(process.env.BASE_URL),
  	routes,
});

export default router;
