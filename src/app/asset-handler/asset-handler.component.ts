import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-asset-handler',
  templateUrl: './asset-handler.component.html',
  styleUrls: ['./asset-handler.component.scss']
})
export class AssetHandlerComponent implements OnInit {

  constructor(
    public $location:Location
  ) { }

  ngOnInit(): void {
    let url = this.$location.path()
    console.log(`/assets${url}`);
    window.location.href = `/assets${url}`
  }

}
