import { Component, OnInit } from "@angular/core";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { _HttpClient } from "@delon/theme";
import { Subscription } from "rxjs";
import { EventService } from "@shared/service/EventService";
import { STColumn, STData } from "@delon/abc";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.less'],
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
    { title: '二级目录名', index: 'text' },
    { title: '通用英文名', index: 'i18n' },
    { title: '路径', index: 'link' },
    { title: '权限角色', index: 'roles' },
    { title: '图标', index: 'icon' },
    {  title: '操作',
      buttons: [
        {
          text: '配置',
          click: (item: any) => this.msg.success(`配置${item.no}`),
        },
        {
          text: '订阅警报',
          click: (item: any) => this.msg.success(`订阅警报${item.no}`),
        },
      ],
    }]
  selectedRows: STData[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private events: EventService
    ) {}

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
        firstMenuId: ['', [Validators.required]],
        icon: ['', [Validators.required]],
        link: ['', [Validators.required]],
      });
    }

    this.getMenuList("init");

    this.subscription = this.events.events().subscribe(event => {
      if (event === "create_menu_success") {
        this.getMenuList("non");
      }
    });
  }

  private getMenuList(status) {
    this.http.get(`/admin/api/menu/menuList`).subscribe(resp =>{
      console.log("resp", resp);

      this.data = resp["data"];
      if (status == "init") {
        this.setFirstMenu();
      }

      resp["data"].map((k, v) => {
        this.categories.push({ id: k.id, text: k.text, value: false });
      });
    })
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
    if (this.data[0] && this.data[0]['children']) {
      this.selectedRows = this.data[0]['children'];
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
      firstMenuId: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      link: ['', [Validators.required]],
    });
    this.visible = true;
  }

  addThirdMenu() {
    this.menuOrder = 3;
    this.oneMenuForm = this.fb.group({
      text: [null, [Validators.required]],
      i18n: [null, [Validators.required]],
      roles: [null, [Validators.required]],
      firstMenuId: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      link: ['', [Validators.required]],
    })
  }

  close() {
    this.visible = false;
  }

  changeOneMenu(e) {
    this.secondMenus = [];
    let value = this.oneMenuForm.controls['firstMenuId'].value;
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
      url = `/admin/api/menu/createSecondMenu?firstMenuId=${this.oneMenuForm.controls['firstMenuId'].value}`;
    }

    this.http.put(url, this.oneMenuForm.value)
      .subscribe(resp => {
        console.log(resp);
        this.msg.success(resp['message']);
        this.events.emit("create_menu_success");
      });
  }

}
