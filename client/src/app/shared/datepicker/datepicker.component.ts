import { Component, EventEmitter, Output } from '@angular/core'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-datepicker',
  template: `
    <input
      type="text"
      ngbDatepicker
      placeholder="Seleccione fecha"
      #d="ngbDatepicker"
      [(ngModel)]="model"
      (click)="d.toggle()"
      (ngModelChange)="selectDateChange()"
      [minDate]="minDate"
      [maxDate]="maxDate"
      readonly
    />
  `,
  styles: [
    `
      input[type="text"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
    `
  ]
})
export class DatepickerComponent {
  @Output() newDate: EventEmitter<NgbDateStruct>;

  private _currentDay: { year: number, month: number, day: number };

  public minDate: NgbDateStruct;
  public maxDate: NgbDateStruct;
  public model: NgbDateStruct;

  constructor() {
    this.newDate = new EventEmitter<NgbDateStruct>();

    this._currentDay = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    }

    this.minDate = {
      year: this._currentDay.year - 100,
      month: this._currentDay.month,
      day: this._currentDay.day
    }

    this.maxDate = {
      year: this._currentDay.year - 22,
      month: this._currentDay.month,
      day: this._currentDay.day
    }

    this.model = this.maxDate;
  }

  public selectDateChange(): void {
    this.newDate.emit(this.model);
  }
}
