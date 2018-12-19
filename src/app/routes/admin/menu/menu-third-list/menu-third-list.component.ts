import { Component, OnInit } from "@angular/core";
import { STColumn, STData } from "@delon/abc";
import { NzMessageService } from "ng-zorro-antd";
import { EventService } from "@shared/service/EventService";

@Component({
  selector: "menu-third-list",
  templateUrl: "./menu-third-list.component.html",
  styleUrls: ["./menu-third-list.component.css"]
})
export class MenuThirdListComponent implements OnInit {

  columns: STColumn[] = [
    { title: "三级目录名", index: "text" },
    { title: "通用英文名", index: "i18n" },
    { title: "路径", index: "link" },
    { title: "权限角色", index: "roles" }
  ];
  selectedRows: STData[] = [];
  i: any;

  constructor(
    public msg: NzMessageService,
    private events: EventService
  ) {
  }

  ngOnInit() {
    this.selectedRows = this.i.children;
  }
}
