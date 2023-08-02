import { Component } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  ngOnInit() {

  }

  async getContacts() {
    try {
      const permission = await Contacts.requestPermissions();
    }
    catch (e) {
      console.log(e);
    }
  }

}
