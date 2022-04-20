import { Injectable } from '@angular/core';
import * as CodeMirror from 'codemirror';
import CMEditingIdentifier from 'src/models/cm_editing_identifier';

@Injectable({
  providedIn: 'root'
})
export class CodeMirrorService {

  constructor() { }

  private getCodeMirrorFromTextArea(textarea: HTMLTextAreaElement): CodeMirror.EditorFromTextArea {
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

  generateCodeMirror(
    textarea: HTMLTextAreaElement,
    allowedEditingIdentifiers: Array<CMEditingIdentifier>,
    inputCounters: { [counter: string]: number },
    passwordString: string | null = null,
  ): CodeMirror.EditorFromTextArea {
    const cmSession = this.getCodeMirrorFromTextArea(textarea);
    this.lockMirror(cmSession, allowedEditingIdentifiers, inputCounters, passwordString);
    return cmSession;
  }

  private lockMirror(
    mirrorObject: CodeMirror.EditorFromTextArea,
    allowedEditingIdentifiers: Array<CMEditingIdentifier>,
    inputCounters: { [counter: string]: number },
    passwordString: string | null = null
  ): void {
    mirrorObject.on("beforeChange", (cm, change) => {
      if (change.origin == "setValue") return;

      let shouldCancelChange = true;
      for (const location of allowedEditingIdentifiers) {
        if (change.from.line !== location.line || change.from.ch < location.ch || change.to.ch > (location.ch + inputCounters[location.counter])) {
          continue;
        }

        if (change.origin == "+delete") {
          inputCounters[location.counter]--;
          shouldCancelChange = false;
          if (location.passwordField) {
            if (change.text[0].length == 1) {
              passwordString!.slice(0, passwordString!.length - 1);
            } else {
              passwordString = passwordString!.replace(passwordString!.substring(change.from.ch - location.ch, change.to.ch - location.ch), '');
            }
          }
          break;
        }

        if (change.origin == "paste") {
          inputCounters[location.counter] += change.text[0].length;
          shouldCancelChange = false;
          if (location.passwordField) {
            passwordString += change.text[0];
            change.text[0] = "*".repeat(change.text[0].length);
          }
          break;
        }

        inputCounters[location.counter]++;
        shouldCancelChange = false;
        if (location.passwordField) {
          passwordString += change.text[0];
          change.text[0] = "*".repeat(change.text[0].length);
        }
        break;
      }

      if (shouldCancelChange) {
        change.cancel()
      }
    })

  }

}
