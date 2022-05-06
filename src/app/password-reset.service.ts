import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor() { }

  async sendEmail(email: string, notifyDisplayError: (error: string) => void): Promise<boolean> {
    const res = await fetch(`${BASE_API_URL}/login/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (res == undefined) {
      notifyDisplayError("There was an internal error while sending mail.");
      return false;
    }

    if (!res.ok) {
      notifyDisplayError("Email couldn't be sent.");
      return false;
    }

    return true;
  }

  async resetPassword(token: string, newPassword: string, notifyDisplayError: (error: string) => void): Promise<boolean> {
    const res = await fetch(`${BASE_API_URL}/user/reset`, {
      method: 'PUT',
      headers: {
        'x-auth-header': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    });

    if (res == undefined) {
      notifyDisplayError("There was an internal error while updating password.")
      return false;
    }

    if (!res.ok) {
      const data = await res.json();
      notifyDisplayError(data.error);
      return false;
    }

    return true;
  }
}
