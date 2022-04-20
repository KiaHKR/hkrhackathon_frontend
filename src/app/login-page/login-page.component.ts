import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as CodeMirror from 'codemirror';

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

  registerDefaultText: string = `def sign_up(user):
  e_mail = ""
  name = ""
  year =  # 1, 2, or 3
  password = ""
  
  return (e_mail, name, year, password)`

  loginDefaultText: string = `def login(user):
  e_mail = ""
  password = ""
  
  if len(e_mail) != 0 && len(password) != 0:
    access = requests.post('14.29.13.42:8300/auth', [e_mail, password])
    
  return access`

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loginCodemirror = CodeMirror.fromTextArea(this.loginTextarea.nativeElement, {
      lineNumbers: true,
      mode: 'python',
      theme: 'nord'
    });
    this.loginCodemirror.setValue(this.loginDefaultText)
    this.lockMirror()
    this.loginCodemirror.refresh()

  }
  lockMirror(): void {

    this.loginCodemirror.on("beforeChange", (cm, change) => {
      if (change.origin !== "setValue" && (change.from.line !== 6 || change.from.ch < 28 || change.to.ch < 28 || change.to.ch > cm.getLine(change.from.line).length - 1 || change.from.ch > cm.getLine(change.from.line).length - 1)) {
        change.cancel()
      }
    })


  }

  changeTab(newTabIndex: number): void {
    this.selectedTab = newTabIndex;


    if (newTabIndex == 0) {
      this.registerCodemirror!.toTextArea()
      this.loginCodemirror = CodeMirror.fromTextArea(this.loginTextarea.nativeElement, {
        lineNumbers: true,
        mode: 'python',
        theme: 'nord'
      });
      setTimeout(() => {
        this.loginCodemirror.refresh();
      })
    } else if (newTabIndex == 1) {
      this.loginCodemirror!.toTextArea()
      this.registerCodemirror = CodeMirror.fromTextArea(this.registerTextarea.nativeElement, {
        lineNumbers: true,
        mode: "python",
        theme: "nord"
      });
      if (this.firstTime) {
        this.registerCodemirror.setValue(this.registerDefaultText);
        this.firstTime = false;
      }
      setTimeout(() => {
        this.registerCodemirror.refresh();
      })

    }
  }

}
