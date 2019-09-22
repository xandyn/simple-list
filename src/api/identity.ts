import axios from 'axios';
import { Identity } from 'models';

class IdentityAPI {
  private readonly baseUrl = '/identity';

  async getIdentity() {
    return await axios.get<Identity>(this.baseUrl);
  }

  async login() {
    return await axios.patch(this.baseUrl, {
      isAuthenticated: true
    });
  }

  async logout() {
    return await axios.patch(this.baseUrl, {
      isAuthenticated: false
    });
  }
}

export const identityAPI = new IdentityAPI();
