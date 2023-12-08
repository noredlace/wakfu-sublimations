import { Component } from '@angular/core';

import sublimationData from './data/sublimations.json';

interface SUBLIMATIONS {
  Name: String;
  Socket1: String;
  Socket1Value: number;
  Socket2: String;
  Socket2Value: number;
  Socket3: String;
  Socket3Value: number;
  "I (Rare)": String;
  "II (Mythical)": String;
  "III (Legendary)": String;
  MaxLevel: String;
  ObtainedFrom: String;
  SincePatch: String;
  Notes: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socketValueOne: number = 0;
  socketValueTwo: number = 0;
  socketValueThree: number = 0;
  socketValueFour: number = 0;


  title = 'wakfu-sublimations-site';

  sublimations: SUBLIMATIONS[] = sublimationData;
  displayedColumns: string[] = ['Name','Socket1','Socket2','Socket3','I (Rare)', 'II (Mythical)', 'III (Legendary)', 'MaxLevel', 'ObtainedFrom', 'SincePatch', 'Notes'];

  submitFilter(isReset:Boolean)
  {

    if (isReset)
    {
      this.socketValueOne = 0;
      this.socketValueTwo = 0;
      this.socketValueThree = 0;
      this.socketValueFour = 0;

      this.sublimations = sublimationData;
    }
    else
    {

      this.sublimations = sublimationData.filter(
        (data: {Socket1Value: number, Socket2Value: number, Socket3Value: number}) =>
        (data.Socket1Value % this.socketValueOne == 0 && data.Socket2Value % this.socketValueTwo == 0 && data.Socket3Value % this.socketValueThree == 0) ||
        (data.Socket1Value % this.socketValueTwo == 0 && data.Socket2Value % this.socketValueThree == 0 && data.Socket3Value % this.socketValueFour == 0)
        );
    }

  }

}


