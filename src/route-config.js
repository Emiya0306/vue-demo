import AntTest from './pages/antTest/antTest'
import Dashboard from './pages/dashboard/dashboard'
import Home from './pages/home/home'
import AdminTest from './pages/adminTest/adminTest'
import Auth from './pages/auth/auth'

const routers = {
    '/sign_up': {
        name: 'auth',
        component: Auth
    },
    '/sign_in': {
        name: 'auth',
        component: Auth
    },
    '/home': {
        name: 'home',
        component: Home
    },
    '/dashboard': {
        name: 'dashboard',
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

