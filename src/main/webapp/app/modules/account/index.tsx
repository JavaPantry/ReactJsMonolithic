import * as React from 'react';
import { Route } from 'react-router-dom';

import Settings from './settings/settings';
import Password from './password/password';
import Sessions from './sessions/sessions';

const Routes = ({ match }) => (
  <div>
    <Route path={`${match.url}/settings`} component={Settings} />
    <Route path={`${match.url}/password`} component={Password} />
    <Route path={`${match.url}/sessions`} component={Sessions} />
  </div>
);

export default Routes;
