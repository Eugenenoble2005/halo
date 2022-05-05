import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public $electron:ElectronService
  ) { }
}
