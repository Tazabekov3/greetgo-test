import { Component } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contacts: any[] = [];
  isScannerActive: boolean = false;

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
      const permission = await Contacts.requestPermissions();
      console.log("permission: ", permission.contacts);

      if (!permission?.contacts) return;
      else if (permission?.contacts == "granted") {
        Contacts.deleteContact({contactId: contact.contactId});
      }
    }
    catch (e) {
      console.log(e);
    }
  }


  checkPermission = async () => {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        return true;
      }

      return false;
      }
    catch(e) {
      console.log(e);
      return false;
    }
  };

  startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
    document.querySelector('body')?.classList.add('scanner-active');
    document.querySelector('ion-content')?.classList.add('ion-hide');
    document.querySelector('.start-scan-button')?.classList.add('ion-hide');
    document.querySelector('.stop-scan-button')?.classList.remove('ion-hide');
    this.isScannerActive = true;

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      alert(result.content);
    }
  };

  stopScan = () => {
    BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
    document.querySelector('ion-content')?.classList.remove('ion-hide');
    document.querySelector('.start-scan-button')?.classList.remove('ion-hide');
    document.querySelector('.stop-scan-button')?.classList.add('ion-hide');
    this.isScannerActive = false;
    BarcodeScanner.stopScan();
  };

}
