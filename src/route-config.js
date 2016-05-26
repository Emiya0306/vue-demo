import About from './pages/about/about'
import Dashboard from './pages/dashboard/dashboard'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Register from './pages/register/register'

const routers = {
    '/about': {
        component: About
    },
    '/dashboard': {
        component: Dashboard
    },
    '/home': {
        component: Home
    },
    '/login': {
        component: Login
    },
    '/register': {
        component: Register
    }
};

export default routers

