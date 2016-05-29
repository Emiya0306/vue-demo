import AntTest from './pages/antTest/antTest'
import Dashboard from './pages/dashboard/dashboard'
import Home from './pages/home/home'
import AdminTest from './pages/adminTest/adminTest'
import Login from './pages/login/login'
import Register from './pages/register/register'

const routers = {
    '/login': {
        component: Login
    },
    '/register': {
        component: Register
    },
    '/home': {
        component: Home
    },
    '/dashboard': {
        component: Dashboard
    },
    '/admintest': {
        component: AdminTest
    },
    '/anttest': {
        component: AntTest
    }
};

export default routers

