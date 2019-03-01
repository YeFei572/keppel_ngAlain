import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UploadFile } from "ng-zorro-antd";

@Component({
    selector: "app-images-upload",
    template: `
        <div class="clearfix">
            <nz-upload
                    nzAction="/admin/api/uploadFile"
                    nzListType="picture-card"
                    [(nzRemove)]="removePic"
                    [(nzFileList)]="files"
                    [nzShowButton]="files.length < length"
                    [nzPreview]="handlePreview"
                    (nzChange)="uploadFileChange($event)">
                <i class="anticon anticon-plus"></i>
                <div class="ant-upload-text">上传</div>
            </nz-upload>
            <nz-modal [nzVisible]="previewVisible" [nzContent]="modalContent" [nzFooter]="null"
                      (nzOnCancel)="previewVisible=false">
                <ng-template #modalContent>
                    <img [src]="previewImage" [ngStyle]="{ 'width': '100%' }"/>
                </ng-template>
            </nz-modal>
        </div>
    `,
    styles: [`
        :host ::ng-deep i {
            font-size: 32px;
            color: #999;
        }

        :host ::ng-deep .ant-upload-text {
            margin-top: 8px;
            color: #666;
        }
    `]
})
export class ImagesUploadComponent {

    previewImage = "";
    previewVisible = false;
    @Input() length = 1;
    @Input() files = [];
    @Output() onValid = new EventEmitter<String>();

    constructor() { }

    handlePreview = (file: UploadFile) => {
        console.log("file>>>", file);
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    };

    /**
     * 删除图片的方法
     * @param file
     */
    removePic = (file: UploadFile) => {
        this.files.map((item, key) => {
            if (item.url === file.url) {
                this.files.splice(key, 1);
            }
        });
    };

    uploadFileChange(info) {
        let errors = info.fileList.filter((f) => f.error);
        this.onValid.emit(info.file.response ? info.file.response.url : null);
        console.log(errors);
        console.log('info', info);
    }

}
