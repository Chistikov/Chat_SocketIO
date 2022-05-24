import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "./pages/HomePage"
import ChatPage from "./pages/ChatPage"
import RoomsPage from "./pages/RoomsPage"

const routes = [
  {path: "/", component: HomePage},
  {path: "/rooms", component: RoomsPage},
  {path: "/chat/:roomId", component: ChatPage}
]

export default createRouter({
  routes,
  history: createWebHistory()
})

