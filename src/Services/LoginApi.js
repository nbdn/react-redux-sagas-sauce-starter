import Config from '../Config/AppConfig';
import { LOGIN_ERRORS } from '../Constants/Errors';

export default {
  // Functions return fixtures
  login: (username, password) => {
    return fetch(`${Config.API_BASE_URL}/users/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Delegated-Application': Config.APP_NAME
      },
      body: JSON.stringify({ login: username, pass: password })
    })
      .then(response => {
        try {
          if (response && response.status === 200) {
            return response.json();
          } else {
            return { ok: false, err: LOGIN_ERRORS.WRONG };
          }
        } catch (e) {
          console.warn('=> Error login request', e);
          return { ok: false, err: e };
        }
      })
      .then(responseJson => {
        if (responseJson && !responseJson.err && responseJson.jwtToken) {
          localStorage.setItem('@auth:token', responseJson.jwtToken);
          localStorage.setItem('@auth:tokenTime', new Date().toJSON());
          return { ok: true, user: responseJson };
        } else {
          return { ok: false, err: responseJson.err };
        }
      })
      .catch(error => {
        console.warn('=> Error login', error);
        return { ok: false, error };
      });
  },

  checkAuth: async () => {
    const jwtToken = localStorage.getItem('@auth:token');

    return fetch(`${Config.API_BASE_URL}/checkauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Delegated-Application': Config.APP_NAME,
        Authorization: `${jwtToken}`
      }
    })
      .then(response => {
        try {
          if (response && response.status === 200) {
            return response.json();
          } else {
            return { ok: false, err: LOGIN_ERRORS.WRONG };
          }
        } catch (e) {
          console.warn('=> Error check auth request', e);
          return { ok: false, err: e };
        }
      })
      .then(async responseJson => {
        if (responseJson && !responseJson.err && responseJson.jwtToken) {
          localStorage.setItem('@auth:token', responseJson.jwtToken);
          localStorage.setItem('@auth:tokenTime', new Date().toJSON());
          return { ok: true, user: responseJson };
        } else {
          localStorage.removeItem('@auth:token');
          localStorage.removeItem('@auth:tokenTime');
          return { ok: false, err: responseJson.err };
        }
      })
      .catch(async error => {
        console.warn('=> Error check auth', error);
        localStorage.removeItem('@auth:token');
        localStorage.removeItem('@auth:tokenTime');
        return { ok: false, error };
      });
  },

  reminder: async email => {
    const res = await fetch(
      `${Config.API_BASE_URL}/getbymail/${encodeURIComponent(email)}`
    )
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          try {
            return response.json();
          } catch (e) {
            return response;
          }
        }
      })
      .then(responseJson => {
        return responseJson;
      });

    if (res && res.hash && res._id) {
      const postData =
        'user_id=' +
        encodeURIComponent(res._id) +
        '&user_hash=' +
        encodeURIComponent(res.hash) +
        '&user_login=' +
        encodeURIComponent(email);

      const sendMailRes = await fetch(`${Config.API_MAIL_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Delegated-Application': Config.APP_NAME
        },
        body: postData
      }).then(response => {
        try {
          if (response && response.status === 200) {
            return { ok: true };
          } else {
            return { ok: false, err: LOGIN_ERRORS.WRONG };
          }
        } catch (e) {
          console.warn('=> Error login request', e);
          return { ok: false, err: e };
        }
      });

      return sendMailRes;
    } else {
      return { ok: false, err: LOGIN_ERRORS.NO_ACCOUNT };
    }
  }
};
