import { API_URL } from '@/configs';
import { setCookie } from '@/app/actions/cookies';

export async function loginFetch<T>(body: T) {
  const response = await fetch(`${API_URL}/users/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (response.ok) {
    const cookies = response.headers.get('set-cookie');

    if (cookies) {
      setCookie('session', cookies.toString());

      if (data && data.deviceInfo && data.deviceInfo.fingerprint) {
        setCookie('deviceFingerprint', data.deviceInfo.fingerprint);
      }
    }
  }

  return data;
}
