import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import * as papa from 'papaparse';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(public navCtrl: NavController, private http: Http) {
    this.readCsvData();
  }

  private readCsvData() {
    this.http.get('assets/dummyData.csv').subscribe(data => {
      this.extractData(data)
    }, err => {
      this.handleError(err)
    });
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    this.headerRow = parsedData[0];

    parsedData.splice(0, 1);

    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i][0] != null && parsedData[i][0] != "") {
        this.csvData.push(parsedData[i]);
      }
    }
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
