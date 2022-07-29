import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Phases } from '../models/phases';
import { Info } from '../models/info';
import { getPhaseKeyText } from '../functions/convertEnums';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpClient) { }

  getInfo(phase: Phases): Promise<Info> {
    return new Promise((res, rej) => {
      this.httpService.get('assets/data/phases.json').subscribe({
        next: (info) => {
          console.log(info, getPhaseKeyText(phase));

          if (info !== undefined) { res((info as any)[getPhaseKeyText(phase)!] as Info); }
          else { rej('is undefined') }
        },
        error: (err) => rej(err)
      });
    });
  }
}
