import { observable, action } from 'mobx';
import { identityAPI } from 'api';
import { Identity } from 'models';

class IdentityStore {
  @observable identity: Identity = {
    isAuthenticated: false,
    name: ''
  };

  @action
  setIdentity(identity: Identity) {
    this.identity = identity;
  }

  async getIdentity() {
    try {
      const result = await identityAPI.getIdentity();

      this.setIdentity(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async login() {
    try {
      await identityAPI.login();

      this.getIdentity();
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await identityAPI.logout();

      this.getIdentity();
    } catch (error) {
      console.log(error);
    }
  }
}

export const identityStore = new IdentityStore();
