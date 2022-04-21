import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as CodeMirror from 'codemirror';
import CMEditingIdentifier from 'src/models/cm_editing_identifier';
import { AuthService } from '../auth.service';
import { InputValidationService } from '../../services/input-validation.service';
import { CodeMirrorService } from 'src/services/codemirror.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent implements OnInit {

  @ViewChild('loginCodemirror') loginTextarea!: ElementRef;
  @ViewChild('registerCodemirror') registerTextarea!: ElementRef;

  allowedEditingIdentifiersLogin = [
    new CMEditingIdentifier(1, 12, 'login_email', false),
    new CMEditingIdentifier(2, 14, 'login_password', true)
  ]

  allowedEditingIdentifiersRegister = [
    new CMEditingIdentifier(1, 12, 'register_email', false),
    new CMEditingIdentifier(2, 10, 'register_name', false),
    new CMEditingIdentifier(3, 9, 'register_year', false),
    new CMEditingIdentifier(4, 14, 'register_password', true)
  ]

  selectedTab: number = 0;
  firstTime: boolean = true;
  loginCodemirror!: CodeMirror.EditorFromTextArea;
  registerCodemirror!: CodeMirror.EditorFromTextArea;
  _passwordString: string = ``
  _inputError: string = ``
  inputCounters: {
    [counter: string]: number,
  } = {
      login_email: 0,
      login_password: 0,
      register_email: 0,
      register_name: 0,
      register_year: 0,
      register_password: 0,
    }

  get registerDefaultText(): string {
    return `def sign_up(user):
  e_mail = ""
  name = ""
  year =  # 1, 2, or 3
  password = ""
  ${this._inputError}
  return (e_mail, name, year, password)`
  }

  get loginDefaultText(): string {
    return `def login(user):
  e_mail = ""
  password = ""
  ${this._inputError}
  if len(e_mail) != 0 && len(password) != 0:
    access = requests.post('14.29.13.42:8300/auth', [e_mail, password])
    
  return access`}

  set passwordString(value: string) {
    this._passwordString = value;
  }

  get passwordString(): string {
    return this._passwordString;
  }

  set inputError(value: string) {
    this._inputError = value;
  }

  constructor(private authService: AuthService, private cmService: CodeMirrorService, private validationService: InputValidationService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loginCodemirror = this.getLoginCM();
    this.loginCodemirror.setValue(this.loginDefaultText);
    this.loginCodemirror.refresh();
  }

  getLoginCM(): CodeMirror.EditorFromTextArea {
    return this.cmService.generateCodeMirror(this.loginTextarea.nativeElement, this.allowedEditingIdentifiersLogin, this.inputCounters, this.passwordString);
  }

  getRegisterCM(): CodeMirror.EditorFromTextArea {
    return this.cmService.generateCodeMirror(this.registerTextarea.nativeElement, this.allowedEditingIdentifiersRegister, this.inputCounters, this.passwordString);
  }

  setInputError(login: Boolean, error: string) {
    this.inputError = `\n "${error}"`
    if (login) {
      this.loginCodemirror.setValue(this.loginDefaultText);
      this.loginCodemirror.refresh();
      return
    }

    this.registerCodemirror.setValue(this.registerDefaultText);
    this.registerCodemirror.refresh();
  }

  userLogin() {
    const currentLoginCMValue: string = this.loginCodemirror.getValue();
    const email: string = /e_mail = "(.*?)"/.exec(currentLoginCMValue)![1].trim();
    const password: string = /password = "(.*?)"/.exec(currentLoginCMValue)![1].trim();

    this.authService.userLogin(email, password);
  }

  userRegister() {
    const currentRegisterCMValue: string = this.registerCodemirror.getValue();
    const email: string = /e_mail = "(.*?)"/.exec(currentRegisterCMValue)![1].trim();
    const name: string = /name = "(.*?)"/.exec(currentRegisterCMValue)![1].trim();
    const year: string = /year = (.*?)#/.exec(currentRegisterCMValue)![1].trim();
    const password: string = /password = "(.*?)"/.exec(currentRegisterCMValue)![1].trim();

    this.validationService.validateUserRegister(email, name, year, password, this.setInputError.bind(this));

    this.authService.userRegister(email, name, year, password);
  }

  changeTab(newTabIndex: number): void {
    this.selectedTab = newTabIndex;
    this.passwordString = ``;

    if (newTabIndex == 0) {
      this.registerCodemirror!.toTextArea()
      this.loginCodemirror = this.getLoginCM();
      setTimeout(() => {
        this.loginCodemirror.refresh();
      })
    } else if (newTabIndex == 1) {
      this.loginCodemirror!.toTextArea()
      this.registerCodemirror = this.getRegisterCM();
      if (this.firstTime) {
        this.registerCodemirror.setValue(this.registerDefaultText);
        this.firstTime = false;
      }
      setTimeout(() => {
        this.registerCodemirror.refresh();
      });
    }
  }

}
