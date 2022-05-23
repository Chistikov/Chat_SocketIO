import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"

const routes = [
  {path: "/", component: HomePage},
  {path: "/chat", component: ChatPage}
]

export default createRouter({
  routes,
  history: createWebHistory()
})

