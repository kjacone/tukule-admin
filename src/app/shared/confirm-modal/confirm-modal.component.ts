import { Component, EventEmitter, Output  ,Input} from '@angular/core';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';



@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Input() inputData: any; 
  @Input() visible: boolean; 

  confirmAction() {
    this.visible = !this.visible;
    this.confirmed.emit();
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }





  
  
  
  
}