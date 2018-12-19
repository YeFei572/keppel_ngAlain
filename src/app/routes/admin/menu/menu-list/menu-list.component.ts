import { Component, OnInit } from "@angular/core";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { _HttpClient } from "@delon/theme";
import { Subscription } from "rxjs";
import { EventService } from "@shared/service/EventService";
import { STColumn, STData } from "@delon/abc";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuThirdListComponent } from "../menu-third-list/menu-third-list.component";

@Component({
  selector: "app-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.less"]
})
export class MenuListComponent implements OnInit {

  oneMenuForm: FormGroup;
  subscription: Subscription;
  data = [];
  categories = [];
  secondMenus = [];
  visible = false;
  menuOrder = 2;
  roleList = [
    { value: "SUP_ADMIN", label: "超级管理员" },
    { value: "NOR_ADMIN", label: "普通管理员" }
  ];

  columns: STColumn[] = [
    { title: "二级目录名", index: "text" },
    { title: "通用英文名", index: "i18n" },
    { title: "路径", index: "link" },
    { title: "权限角色", index: "roles" },
    { title: "图标", index: "icon" },
    {
      title: "操作",
      buttons: [
        {
          text: "查看",
          type: "modal",
          component: MenuThirdListComponent,
          paramName: "i",
          click: () => this.msg.info("回调，重新发起列表刷新")
        }
      ]
    }];
  selectedRows: STData[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private events: EventService
  ) {
  }

  ngOnInit() {
    if (this.menuOrder === 1) {
      this.oneMenuForm = this.fb.group({
        text: [null, [Validators.required]],
        i18n: [null, [Validators.required]],
        roles: [null, [Validators.required]]
      });
    } else if (this.menuOrder === 2) {
      this.oneMenuForm = this.fb.group({
        text: [null, [Validators.required]],
        i18n: [null, [Validators.required]],
        roles: [null, [Validators.required]],
        firstMenuId: ["", [Validators.required]],
        icon: ["", [Validators.required]],
        link: ["", [Validators.required]]
      });
    }

    this.getMenuList("init");

    this.subscription = this.events.events().subscribe(event => {
      if (event === "create_menu_success") {
        this.getMenuList("init");
      }
    });
  }

  private getMenuList(status) {
    this.http.get(`/admin/api/menu/menuList`).subscribe(resp => {
      this.data = resp["data"];
      this.categories = [];
      resp["data"].map((k, v) => {
        this.categories.push({ id: k.id, text: k.text, value: false });
      });
      if (status == "init") {
        this.setFirstMenu();
      }
    });
  }

  changeCategory(status: boolean, idx: number) {
    this.categories.map((k, v) => {
      k.value = false;
      if (v === idx) {
        this.categories[idx].value = status;
        this.selectedRows = this.data[idx].children ? this.data[idx].children : [];
        console.log(">", this.selectedRows);
      }
    });
  }

  setFirstMenu() {
    console.log("this.data", this.data);
    if (this.data[0] && this.data[0]["children"]) {
      this.categories[0].value = true;
      this.selectedRows = [];
      this.selectedRows = this.data[0]["children"];
      console.log("this.selectedRows", this.selectedRows);
    }
  }

  addOneMenu() {
    this.menuOrder = 1;
    this.oneMenuForm = this.fb.group({
      text: [null, [Validators.required]],
      i18n: [null, [Validators.required]],
      roles: [null, [Validators.required]]
    });
    this.visible = true;
  }

  addTwoMenu() {
    this.menuOrder = 2;
    this.oneMenuForm = this.fb.group({
      text: [null, [Validators.required]],
      i18n: [null, [Validators.required]],
      roles: [null, [Validators.required]],
      firstMenuId: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      link: ["", [Validators.required]]
    });
    this.visible = true;
  }

  addThirdMenu() {
    this.menuOrder = 3;
    this.oneMenuForm = this.fb.group({
      text: [null, [Validators.required]],
      i18n: [null, [Validators.required]],
      roles: [null, [Validators.required]],
      firstMenuId: ["", [Validators.required]],
      secondLink: ["", [Validators.required]],
      link: ["", [Validators.required]]
    });
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  changeOneMenu() {
    this.secondMenus = [];
    this.oneMenuForm.controls.secondLink.setValue("");
    let value = this.oneMenuForm.controls["firstMenuId"].value;
    if (this.data.length > 0) {
      this.data.map((k, v) => {
        if (k.id == value) {
          this.secondMenus = k["children"] ? k["children"] : [];
        }
      });
    }

  }

  submitOneMenu() {
    let url = `/admin/api/menu/createFirstMenu`;
    if (this.menuOrder === 2) {
      url = `/admin/api/menu/createSecondMenu?firstMenuId=${this.oneMenuForm.controls["firstMenuId"].value}`;
    }
    if (this.menuOrder === 3) {
      url = `/admin/api/menu/createThirdMenu?firstMenuId=${this.oneMenuForm.controls["firstMenuId"].value}&secondLink=${this.oneMenuForm.controls["secondLink"].value}`;
    }
    this.http.put(url, this.oneMenuForm.value)
      .subscribe(resp => {
        console.log(resp);
        this.msg.success(resp["message"]);
        this.events.emit("create_menu_success");
        this.visible = false;
      });
  }

}
