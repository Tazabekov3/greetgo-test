import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.page.html',
  styleUrls: ['./second-page.page.scss'],
})
export class SecondPagePage implements OnInit {

  contact: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getContact();
  }

  async getContact() {
    if (!this.activatedRoute.snapshot.paramMap.get('id')) return;
    else {
      const id = this.activatedRoute.snapshot.paramMap.get('id')!;
      const result = await Contacts.getContact({
        contactId: id,
        projection: {
          name: true,
          phones: true,
          emails: true,
          image: true,
        }
      });
      this.contact = result.contact;
    }
  }

}
