import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as CodeMirror from 'codemirror';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPageComponent implements OnInit {

  @ViewChild('loginCodemirror') loginTextarea!: ElementRef;
  @ViewChild('registerCodemirror') registerTextarea!: ElementRef;

  selectedTab: number = 0;
  firstTime: Boolean = true;
  loginCodemirror!: CodeMirror.EditorFromTextArea;
  registerCodemirror!: CodeMirror.EditorFromTextArea;
  inputError: string = ``
  counter: number = 0;

  get registerDefaultText(): string {
    return `def sign_up(user):
  e_mail = ""
  name = ""
  year =  # 1, 2, or 3
  password = ""
  ${this.inputError}
  return (e_mail, name, year, password)`
  }

  get loginDefaultText(): string {
    return `def login(user):
  e_mail = ""
  password = ""
  ${this.inputError}
  if len(e_mail) != 0 && len(password) != 0:
    access = requests.post('14.29.13.42:8300/auth', [e_mail, password])
    
  return access`}

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loginCodemirror = this.generateLoginCodeMirror();
    this.loginCodemirror.setValue(this.loginDefaultText)
    this.loginCodemirror.refresh()
  }

  setInputError(login: Boolean, error: string) {
    console.log(error)
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


  }

  userRegister() {
    const emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const currentRegisterCMValue: string = this.registerCodemirror.getValue();
    const email: string = /e_mail = "(.*?)"/.exec(currentRegisterCMValue)![1].trim();
    const name: string = /name = "(.*?)"/.exec(currentRegisterCMValue)![1].trim();
    const year: string = /year = (.*?)#/.exec(currentRegisterCMValue)![1].trim();
    const password: string = /password = "(.*?)"/.exec(currentRegisterCMValue)![1].trim();

    if (email == "") {
      this.setInputError(false, "Email must not be empty.");
      return
    }

    if (!email.match(emailRegExp)) {
      this.setInputError(false, "Invalid email format.")
      return
    }

    if (name == "") {
      this.setInputError(false, "Name must not be empty.")
      return
    }

    const yearNum: number = Number.parseInt(year);
    console.log(yearNum)
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 3) {
      this.setInputError(false, "Year must only contain 1, 2, or 3.")
      return
    }

    if (password.length < 8) {
      this.setInputError(false, "Password must be at least 8 characters long.")
    }

    console.log(email)
    console.log(name)
    console.log(year)
    console.log(password)
  }

  generateCodeMirror(textarea: HTMLTextAreaElement): CodeMirror.EditorFromTextArea {
    return CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: 'python',
      theme: 'nord',
      lineWrapping: true,
      extraKeys: {
        Enter: () => { }
      }
    });
  }

  generateLoginCodeMirror() {
    const loginMirrorSession = this.generateCodeMirror(this.loginTextarea.nativeElement)
    this.lockMirror(loginMirrorSession, true)
    return loginMirrorSession
  }

  generateRegisterCodeMirror() {
    const registerMirrorSession = this.generateCodeMirror(this.registerTextarea.nativeElement)
    this.lockMirror(registerMirrorSession, false)
    return registerMirrorSession

  }

  lockMirror(mirrorObject: CodeMirror.EditorFromTextArea, login: Boolean): void {

    if (login) {
      mirrorObject.on("beforeChange", (cm, change) => {
        if (change.origin !== "setValue" && (change.from.line !== 5 || change.from.ch < 29 || change.to.ch > (29 + (this.counter - 1)))) {
          change.cancel()
          return
        }
        if (change.origin == "+delete") {
          this.counter--;
        }
        else {
          this.counter++;
        }
      })
    }
    else {
      mirrorObject.on("beforeChange", (cm, change) => {
        if (change.origin !== "setValue" && (change.from.line !== 5 || change.from.ch < 29 || change.to.ch > (29 + (this.counter - 1)))) {
          change.cancel()
        }
      })
    }

  }

  changeTab(newTabIndex: number): void {
    this.selectedTab = newTabIndex;


    if (newTabIndex == 0) {
      this.registerCodemirror!.toTextArea()
      this.loginCodemirror = this.generateLoginCodeMirror();
      setTimeout(() => {
        this.loginCodemirror.refresh();
      })
    } else if (newTabIndex == 1) {
      this.loginCodemirror!.toTextArea()
      this.registerCodemirror = this.generateRegisterCodeMirror();
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
