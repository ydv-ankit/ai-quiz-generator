// Utility functions for handling authentication cookies

export const setAuthCookie = (token: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `auth=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
  }
};

export const removeAuthCookie = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export const getAuthCookie = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
    return authCookie ? authCookie.split('=')[1] : null;
  }
  return null;
}; 