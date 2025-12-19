import { Component, inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { I18NService } from '../../../state/i18n.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { WmsSourceCredentials } from 'src/app/db/db';

@Component({
  selector: 'app-wms-credentials',
  templateUrl: './wms-credentials.component.html',
  styleUrl: './wms-credentials.component.scss',
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
})
export class WmsCredentialsComponent {
  dialogRef = inject<MatDialogRef<WmsCredentialsComponent, WmsSourceCredentials>>(MatDialogRef);
  wmsSourceUrl = inject<string>(MAT_DIALOG_DATA);
  i18n = inject(I18NService);

  credentials: WmsSourceCredentials = {} as WmsSourceCredentials;

  cancel() {
    this.dialogRef.close(undefined);
  }

  ok() {
    this.dialogRef.close(this.credentials);
  }
}
