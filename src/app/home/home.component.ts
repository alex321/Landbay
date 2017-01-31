import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialog, MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import {emailValidator} from '../shared';

import {SuccessDialogComponent} from './success-dialog.component';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards = [
    {title: 'Invest in prime UK buy-to-let', img: 'img/house.png'}, {
      title: 'Access money early with our Tracker product',
      img: 'img/access_money.png'
    },
    {title: 'Earn interest monthly', img: 'img/access_money.png'},
    {title: 'Inflation busting returns', img: 'img/house.png'}
  ];

  form: FormGroup;

  constructor(
      private _mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer,
      private _fb: FormBuilder, private _dialogService: MdDialog) {}

  ngOnInit() {
    this._initIcons();
    this._initForm();
  }

  onContinueClick() { this._dialogService.open(SuccessDialogComponent); }

  private _initIcons() {
    ['mail', 'pin', 'padlock'].forEach(iconName => {
      this._mdIconRegistry.addSvgIcon(
          iconName, this.sanitizer.bypassSecurityTrustResourceUrl(
                        `/img/${iconName}_icon.svg`));
    });
  }

  private _initForm() {
    this.form = this._fb.group(
        {
          email: ['', [Validators.required, emailValidator]],
          email2: ['', [Validators.required, emailValidator]],
          password: [
            '',
            [
              Validators.minLength(10), Validators.pattern(/.*[0-9]+/),
              Validators.pattern(/.*[a-z]+/), Validators.pattern(/.*[A-Z]+/),
              Validators.pattern(/.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/),
              Validators.required
            ]
          ],
          pin: ['', [Validators.pattern(/^[0-9]{5}$/), Validators.required]],
          terms: [false, Validators.requiredTrue]
        },
        {validator: this._emailsEqualValidation.bind(this)});
  }

  private _emailsEqualValidation(group: FormGroup) {
    return (group.get('email').value === group.get('email2').value) ?
        null :
        {equalEmails: {valid: false}};
  }
}
