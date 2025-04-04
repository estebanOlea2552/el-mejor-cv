import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Jodit } from 'jodit';

@Component({
  selector: 'paragraph',
  template: `
    <div [formGroup]="groupName">
      <textarea
        matInput
        [formControlName]="controlName"
        #textEditor
        id="textEditor">
      </textarea>
    </div>
  `,
  styles: [``],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class ParagraphComponent implements AfterViewInit, OnDestroy {
  @Input() groupName!: FormGroup;
  @Input() controlName!: string;
  @ViewChild('textEditor') textEditor!: ElementRef;
  editor: Jodit | undefined;

  constructor() { }
  
  ngAfterViewInit():void {
    const editorConfig = {
      buttons: ['bold', 'italic', 'underline', , 'undo', 'redo'],
      /* 'left','right', 'center' 'ul'*/
      toolbarSticky: false,
      height: 'auto',
      minHeight: 230,
      maxHeight: '100%',
      width: '100%',
      allowResizeX: false,
      allowResizeY: false,
      showWordsCounter: false,
      showCharsCounter: false,
      placeholder: 'Escriba su texto aquí...',
      tabIndex: 0,
      enter: "BR"
    };
    

    this.editor = Jodit.make(this.textEditor.nativeElement, editorConfig);

    this.editor.events.on('change', () => {
      const content = this.editor?.value; // Obtains the editor's content
      this.groupName.get(this.controlName)?.setValue(content); // Update the formControl
    });
  }

  ngOnDestroy():void {
    this.editor?.destruct();
  }

  public resetParagraph(): void {
    if(this.editor) {
      this.editor.value = '';
      this.groupName.get(this.controlName)?.setValue('');
    }
  }
}
