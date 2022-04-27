import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '../views/ProfileView.vue';
import FriendsView from '../views/FriendsView.vue';
import SettingsView from '../views/SettingsView.vue';
import PostViewVue from "@/views/PostView.vue";

const routes = [
  	{
  	  	path: "/",
  	  	name: "Home",
  	  	component: HomeView,
  	  	props: true,
		meta: {
			requiresAuth: true
		}
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
	},
    {
        path: "/profile",
        name: "Profile",
        component: ProfileView,
        props: true,
		meta: {
			requiresAuth: true
		}
    },
	{
		path: "/friends",
		name: "FriendsView",
		component: FriendsView,
		props: true,
		meta: {
			requiresAuth: true
		}
	}, 
	{
		path: "/settings",
		name: "Settings",
		component: SettingsView,
		props: true,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/new-post",
		name: "Post",
		component: PostView,
		props: true,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/post",
		name: "Comment",
		component: CommentView,
		props: true,
		meta: {
			requiresAuth: true
		}
	}
];

const router = createRouter({
  	history: createWebHistory(process.env.BASE_URL),
  	routes,
});

router.beforeEach((to, from, next) => {
	// check if the user is logged in, if not then redirect to login
	let isLoggedIn = localStorage.token ? true : false;
	if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
		next("/login");
	}
	next();
});

export default router;
