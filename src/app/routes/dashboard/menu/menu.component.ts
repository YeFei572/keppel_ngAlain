import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

  list: any[] = [];

  loading = true;

  // region: cateogry
  categories = [];

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
    this.getData();
  }
  // endregion

  constructor(private http: _HttpClient, public msg: NzMessageService) {}

  ngOnInit() {
    this.getMenuList();
    this.getData();
  }

  getData() {
    this.loading = true;
    this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
      this.list = this.list.concat(res);
      this.loading = false;
    });
  }

  private getMenuList() {
    this.http.get(`/admin/api/menu/menuList`).subscribe(resp =>{
      console.log('resp>>', resp['data']);
      resp['data'].map((k,v) => {
        this.categories.push({id: k.id, text: k.text, value: false})
      })
    })
  }
}
