import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastContainerDirective, ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  page: number = 1; // test
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;

  constructor(private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.toasterService.overlayContainer = this.toastContainer;
  }

  changePage(toPage: number) {
    this.page = toPage;
  }
}
