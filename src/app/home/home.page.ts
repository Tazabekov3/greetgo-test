import { Component } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contacts: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getContacts();
  }

  async getContacts() {
    try {
      const permission = await Contacts.requestPermissions();
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

  goToSecondPage(contact: any) {
    const id = contact.contactId;
    this.router.navigateByUrl(`/second-page/${id}`);
  }

  async deleteContact(contact: any) {
    try {
      Contacts.deleteContact(contact.contactId);
    }
    catch (e) {
      console.log(e);
    }
  }

}
