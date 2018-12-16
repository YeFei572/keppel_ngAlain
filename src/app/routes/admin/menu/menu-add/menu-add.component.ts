import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { _HttpClient } from "@delon/theme";
import { EventService } from "@shared/service/EventService";

@Component({
  selector: "app-menu-add",
  templateUrl: "./menu-add.component.html",
  styleUrls: ["./menu-add.component.css"]
})
export class MenuAddComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  roleList = [
    { value: "SUP_ADMIN", label: "超级管理员" },
    { value: "NOR_ADMIN", label: "普通管理员" }
  ];

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private http: _HttpClient,
    private events: EventService,
    ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, [Validators.required]],
      i18n: [null, [Validators.required]],
      roles: [null, [Validators.required]]
    });
  }

  submit() {
    this.http.put(`/admin/api/menu/createFirstMenu`, this.form.value)
      .subscribe(resp => {
        console.log(resp);
        this.msg.success(resp['message']);
        this.events.emit("create_menu_success");
      })
  }

}
