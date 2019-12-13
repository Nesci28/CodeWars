import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  HostListener
} from "@angular/core";
import { NgControl, ValidationErrors } from "@angular/forms";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appFormControlValidator]"
})
export class FormControlValidatorDirective implements OnInit, OnDestroy {
  constructor(private elRef: ElementRef, private control: NgControl) {}

  @Input() validationMsgId: string;

  errorSpanId: string = "";
  statusChangeSubscription: Subscription;

  @HostListener("blur", ["$event"])
  handleBlurEvent(event) {
    if (this.control.value == null || this.control.value == "") {
      this.control.errors ? this.showError() : this.removeError();
    }
  }

  async ngOnInit(): Promise<void> {
    this.errorSpanId =
      this.validationMsgId + new Date().getTime() + "-error-msg";
    this.statusChangeSubscription = this.control.statusChanges.subscribe(
      status => {
        status === "INVALID" ? this.showError() : this.removeError();
      }
    );
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  private showError() {
    this.removeError();
    const width = this.elRef.nativeElement.offsetWidth;
    const height = this.elRef.nativeElement.offsetHeight;
    console.log("height :", height);
    const left = this.elRef.nativeElement.offsetLeft;
    const top = this.elRef.nativeElement.offsetTop;
    const valErrors: ValidationErrors = this.control.errors;
    const firstKey = Object.keys(valErrors)[0];
    // TODO: Create message
    const errorMsg = `test-${firstKey}`;
    const errSpan = `<div style="display:inline-block;position:absolute;width:${width -
      2}px;top:${top + height - 1}px;left:${left +
      1}px;" class="invalid-feedback" id="${
      this.errorSpanId
    }">${errorMsg}</div>`;
    this.elRef.nativeElement.parentElement.insertAdjacentHTML(
      "beforeend",
      errSpan
    );
    const errorDiv = document.getElementById(`${this.errorSpanId}`);
    const errorHeight = errorDiv.offsetHeight;
    const newMargin = `${+this.elRef.nativeElement.style.marginBottom.replace(
      /\D/g,
      ""
    ) + +errorHeight}px`;
    console.log("newMargin :", newMargin);
    this.elRef.nativeElement.style.marginBottom = newMargin;
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) {
      const errorHeight = errorElement.offsetHeight;
      errorElement.remove();
      this.elRef.nativeElement.style.marginBottom = `${this.elRef.nativeElement.style.marginBottom.replace(
        /\D/g,
        ""
      ) - errorHeight}px`;
    }
  }
}
