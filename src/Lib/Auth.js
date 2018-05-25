import Config from '../Config/AppConfig';

export async function authFetch(url, method = 'GET', body = null) {
  const token = getToken();

  const data = await fetch(`${Config.API_BASE_URL}${url}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      'X-Delegated-Application': Config.APP_NAME,
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        try {
          return response.json();
        } catch (e) {
          return response;
        }
      }

      return { status: false };
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log('Err auth fetch', error);
      return false;
    });

  return data;
}

export const getToken = () => {
  const accessToken = localStorage.getItem('@auth:token');

  return accessToken;
};

export const cleanStorage = () => {
  localStorage.removeItem('@auth:token');
  localStorage.removeItem('@auth:tokenTime');
};
