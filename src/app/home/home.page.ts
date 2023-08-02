import { Component } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  permission: any;
  contacts: any[] = [];

  constructor() {}

  ngOnInit() {
    this.getContacts();
  }

  async getContacts() {
    try {
      const permission = await Contacts.requestPermissions();
      this.permission = permission;
      console.log("permission: ", permission.contacts);

      if (!permission?.contacts) return;
      else if (permission?.contacts == "granted") {
        const result = await Contacts.getContacts({
          projection: {
            name: true,
            phones: true,
            emails: true,
            image: true,
          }
        });
        console.log("result: ", result);
        this.contacts = result.contacts;
        console.log(this.contacts);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

}
