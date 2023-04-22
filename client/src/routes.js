import {
    ADMIN_ROUTER,
    BASKET_ROUTER, ITEM_ROUTER,
    LOGIN_ROUTER,
    REGISTRATION_ROUTER,
    SHOP_ROUTER } from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ItemPage from "./pages/ItemPage";


export const authRoutes = [
    {
        path: ADMIN_ROUTER,
        component: Admin
    },
    {
        path: BASKET_ROUTER,
        component: Basket
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTER,
        component: Shop
    },
    {
        path: LOGIN_ROUTER,
        component: Auth
    },
    {
        path: REGISTRATION_ROUTER,
        component: Auth
    },
    {
        path: ITEM_ROUTER + '/:id',
        component: ItemPage
    },
]