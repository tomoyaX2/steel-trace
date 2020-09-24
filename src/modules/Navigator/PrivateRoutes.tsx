import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, useHistory
} from "react-router-dom";
import { Routes } from '../../enums/routes';
import { getPrivate } from '../Auth/store';
import Home from '../Home/Home';

const PrivateRoutes: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPrivate(history))
  }, [])

  return (
    <div className='flex flex-row'>
      <Route path={Routes.home} component={Home} />
    </div>
  )
}


export default PrivateRoutes