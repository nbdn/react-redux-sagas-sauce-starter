import { call, put } from 'redux-saga/effects';
import LoginActions from '../Redux/LoginRedux';
import { LOGIN_ERRORS } from '../Constants/Errors';

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// attempts to login
export function* login(api, action) {
  const { username, password } = action;

  if (!password || password.trim().length <= 0) {
    yield put(LoginActions.loginFailure(LOGIN_ERRORS.WRONG));
  } else if (!regexEmail.test(username)) {
    yield put(LoginActions.loginFailure(LOGIN_ERRORS.WRONG_EMAIL_FORMAT));
  } else {
    const response = yield call(api.login, username, password);

    if (response.ok) {
      yield put(LoginActions.loginSuccess(username));
    } else {
      yield put(LoginActions.loginFailure(LOGIN_ERRORS.WRONG));
    }
  }
}

export function* checkAuth(api, action) {
  const response = yield call(api.checkAuth);

  if (response.ok) {
    yield put(LoginActions.checkIfLoggedInSuccess(true));
  } else {
    yield put(LoginActions.checkIfLoggedInFailure(false));
  }
}

export function* reminder(api, action) {
  const { emailReminder } = action;

  if (!emailReminder || emailReminder.trim().length <= 0) {
    yield put(LoginActions.reminderFailure(LOGIN_ERRORS.MISSING_REMINDER));
  } else if (!regexEmail.test(emailReminder)) {
    yield put(LoginActions.reminderFailure(LOGIN_ERRORS.FORMAT_REMINDER));
  } else {
    const response = yield call(api.reminder, emailReminder);
    if (response.ok) {
      yield put(LoginActions.reminderSuccess(emailReminder));
    } else {
      yield put(LoginActions.reminderFailure(LOGIN_ERRORS.WRONG));
    }
  }
}

export function* loginFB(api, action) {
  const { fullName, firstName, lastName, picture, email } = action;
  yield put(
    LoginActions.loginFbSuccess(fullName, firstName, lastName, picture, email)
  );
}
