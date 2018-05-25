import { takeLatest, all } from 'redux-saga/effects';
// import DebugConfig from '../Config/DebugConfig'
import loginApi from '../Services/LoginApi';

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux';

/* ------------- Sagas ------------- */

import { checkAuth, login, reminder } from './LoginSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // LOGIN ACTIONS
    takeLatest(LoginTypes.LOGIN_REQUEST, login, loginApi),
    takeLatest(LoginTypes.CHECK_IF_LOGGED_IN_REQUEST, checkAuth, loginApi),
    takeLatest(LoginTypes.REMINDER_REQUEST, reminder, loginApi)
  ]);
}
