import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { _HttpClient } from "@delon/theme";
import { EventService } from "@shared/service/EventService";

@Component({
    selector: "admin-user-list",
    templateUrl: "./admin-user-list.component.html",
    styleUrls: ["./admin-user-list.component.less"]
})
export class AdminUserListComponent implements OnInit {
    data = [];
    pics = [];
    _total = 0;
    _current = 1;
    _pageSize = 10;
    visible = false;
    adminForm: FormGroup;

    adminTypes = [
        { label: "超级管理员", id: 0 },
        { label: "一级管理员", id: 1 },
        { label: "二级管理员", id: 2 }
    ];

    constructor(
        private fb: FormBuilder,
        private modal: NzModalService,
        private http: _HttpClient,
        public msg: NzMessageService,
        private events: EventService
    ) {
    }

    ngOnInit() {
        this.refreshData();
        this.adminForm = this.fb.group({
            account: [null, [Validators.required]],
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            mobile: [null, [Validators.required]],
            beSuperAdmin: [false, [Validators.required]],
            adminType: [false, [Validators.required]],
            pic: [null, [Validators.required]]
        })
    }

    onImageValid(imgurl) {
        if (imgurl) {
            this.adminForm.controls.pic.markAsDirty();
            this.adminForm.controls.pic.markAsTouched();
            this.adminForm.controls.pic.setValue(imgurl);
        }
    }

    refreshData() {
        this.getAdminUser();
    }

    getAdminUser() {
        this.http.get(`/admin/api/accounts/list`)
            .subscribe(resp => {
                console.log("resp>", resp);
                this.data = resp["data"];
            });
    }

    deleteUser(id) {
        this.http.delete(`/admin/api/accounts/delete/${id}`)
            .subscribe(resp => {
                this.data = resp["data"];
            });
    }

    addAdminAccount() {
        this.visible = true;
    }

    close() {
        console.log("form", this.adminForm.value);
        this.visible = false;
    }

    submit() {
        console.log(this.adminForm.value);
    }

}
