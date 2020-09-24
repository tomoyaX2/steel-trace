import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Routes } from '../../enums/routes';
import LoginContainer from '../Auth/Login/Login.container';
import { selectToken } from '../Auth/store';
import VerifyCodeContainer from '../Auth/VerifyCode/VerifyCode.container';
import NotFound from '../NotFound/NotFound';
import PrivateRoutes from './PrivateRoutes';


const Navigator: React.FC = () => {
  const token = useSelector(selectToken)
  return (
    <Switch>
      <Route path={Routes.login} exact component={LoginContainer} />
      <Route path={Routes.verify} component={VerifyCodeContainer} />
      {!!token &&
        <Route path={Routes.private} component={PrivateRoutes} />
      }
      <Route component={NotFound} />
    </Switch>
  )
}


export default Navigator