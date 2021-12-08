import { ApiService } from 'src/app/services/api/api.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storage: StorageService,
    private fireAuth: AngularFireAuth,
    private adb: AngularFirestore,
    private apiService: ApiService
  ) {}

  async login(email: string, password: string): Promise<any> {
    //call login api
    try {
      const response = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      if (response.user) {
        this.setUserData(response.user.uid);
      }
    } catch (e) {}
  }

  async getId() {
    return (await this.storage.getStorage('uid')).value;
  }

  async register(formValue) {
    try {
      const registeredUser = await this.fireAuth.createUserWithEmailAndPassword(
        formValue.email,
        formValue.password
      );
      console.log('resgitered user: ', registeredUser);
      const data = {
        uid: registeredUser.user.uid,
        email: formValue.email,
        phone: formValue.phone,
        name: formValue.name,
        type: 'user',
        status: 'active',
      };
      await this.apiService
        .collection('users')
        .doc(registeredUser.user.uid)
        .set(Object.assign({}, data));
      await this.setUserData(registeredUser.user.uid);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(email: string) {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
    } catch (e) {
      throw e;
    }
  }

  setUserData(uid) {
    this.storage.setStorage('uid', uid);
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      return this.storage.removeStorage('uid');
    } catch (e) {
      throw e;
    }
  }

  async updateEmail(oldEmail, newEmail, password) {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(
        oldEmail,
        password
      );
      await result.user.updateEmail(newEmail);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged((user) => {
        console.log('auth user: ', user);
        if (user) {
          this.setUserData(user.uid);
          resolve(user.uid);
        } else {
          this.logout();
          reject(false);
        }
      });
    });
  }
}
