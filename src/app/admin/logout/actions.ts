// src/app/admin/logout/actions.ts
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieName = process.env.COOKIE_SECRET_NAME || 'admin_session_token';
  const cookieStore = await cookies();
  cookieStore.set({
    name: cookieName,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
    sameSite: 'strict',
  });
  redirect('/');
};
