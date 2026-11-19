// src/app/admin/login/actions.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookieName = process.env.COOKIE_SECRET_NAME || 'admin_session_token';
  const cookieValue = process.env.COOKIE_SECRET_VALUE || 'secure_auth_token_value';

  if (!password || password !== adminPassword) {
    return { error: 'Invalid password! Please try again' };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: cookieName,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
  });
  redirect('/admin/dashboard');
}