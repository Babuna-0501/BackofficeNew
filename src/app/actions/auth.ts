'use server';

import { signIn, signOut } from '@/auth';
import { loginFetch } from '@/services';
import { headers } from 'next/headers';
import { deleteCookie, getCookie } from '@/app/actions/cookies';
import { formDataToObject } from '@/utils';

export async function loginAction(formData: FormData) {
  const data = formDataToObject(formData);

  const headersList = await headers();

  const deviceFingerprint = await getCookie('deviceFingerprint');

  const loginData = {
    deviceName: headersList.get('user-agent') ?? 'unknown device',
    deviceType: 'web',
    ...data,
    ...(deviceFingerprint ? { deviceFingerprint: deviceFingerprint.value } : {})
  };

  const { user, errors } = await loginFetch(loginData);

  if (user) {
    await signIn('credentials', {
      userId: user.id,
      redirectTo: '/dashboard'
    });
  }

  return {
    message: errors[0].message
  };
}

export async function logoutAction() {
  deleteCookie('supplierId');
  deleteCookie('session');
  await signOut({ redirectTo: '/login' });
}
