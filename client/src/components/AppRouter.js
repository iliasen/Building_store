// import React from 'react';
// import {Switch, Route, Redirest} from 'react-router-dom'
// import {authRoutes, publicRoutes} from "../routes";
// import {SHOP_ROUTER} from "../utils/consts";
//
// const AppRouter = () => {
//     const flag = false
//     return (
//         <Switch>
//             {flag && authRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact/>
//             )}
//             {publicRoutes.map(({path, Component}) =>
//                 <Route key={path} path={path} component={Component} exact/>
//             )}
//             <Redirest to={SHOP_ROUTER}/>
//         </Switch>
//     );
// };
// export default AppRouter;

import React from 'react'
    import {Routes, Route, Navigate} from 'react-router-dom'
    import {authRoutes, publicRoutes} from '../routes';
    import {SHOP_ROUTER} from '../utils/consts';
    const AppRouter = () => {
    const flag = false
    return (
        <Routes>
            {flag && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Navigate to={SHOP_ROUTER}/>}
        </Routes>
    );
};
        export default AppRouter;

