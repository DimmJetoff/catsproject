import VueRouter from 'vue-router'
import PageMain from './components/PageMain'
import PageCatalog from './components/PageCatalog'
import IndexCard from './components/Card/IndexCard'

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: PageMain
        },
        {
            path: '/PageCatalog',
            component: PageCatalog,
            name: 'PageCatalog'
        },
        {
            path: '/IndexCard/:id',
            component: IndexCard,
            name: 'IndexCard',
            props: true
        }
    ]

})