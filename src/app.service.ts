import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { HttpBackendService } from './http-backend.service';

export interface MiningPowerData {
  collection_name: string,
  name: string,
  template_id: string,
  material: string
  mining_power: string
}

@Injectable()
export class AppService extends HttpBackendService {

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getHello(): string {
    return 'Hello World!';
  }

  public exportMiningPower(): Observable<any> {
    return this.get('https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vTCxPdVMiIJlK4QBe41sEDWkW7esVCz1map3IfMSCKxccN61ua0k_tqP7qOEySp_0YixT09CMh6H6Vo/pubhtml?gid=748384402&single=true', { responseType: 'text'}).pipe(
      map((response: string) => {
        try {
          const parsedResp = response.replace(/(\r\n|\n|\r)/gm,"");
          const matchedResp = parsedResp.match(/(\<table).*(<\/table)/g);

          var html = '<table' + matchedResp + '</table>';
          var trs = [...html.matchAll(/<tr[\s\S\w]+?<\/tr>/g)];

          const miningPowerData: {
            eos: MiningPowerData[],
            wax: MiningPowerData[]
          } = {
            eos: [],
            wax: []
          };
          let data = [];
          let tableColumns;
          for (var i=0;i<trs.length;i++){
            var tds = [...trs[i][0].matchAll(/<(td|th)[\s\S\w]+?<\/(td|th)>/g)];
            var prov = [];
            for (var j=0;j<tds.length;j++){
              const str = tds[j][0];
              if (str) {
                // Old logic, not works on IOS
                // let donnee = str.match(/(?<=\>).*(?=\<\/)/g)![0]?.replace(/&nbsp;/g,' ');
                // prov.push(this.stripTags('donnee'));

                const sliced = str.slice(str.indexOf('>') + 1, str.indexOf('</'));
                let result = '';
                if (sliced.includes('<a')) {
                  result = sliced.slice(sliced.lastIndexOf('>') + 1)
                } else {
                  result = sliced;
                }

                prov.push(result)
              }
            }
            if (prov.includes('WAX')) {
              miningPowerData.wax.push({
                collection_name: prov[2],
                name: prov[3],
                template_id: prov[4],
                material: prov[7],
                mining_power: prov[8],
              });
            }
            if (prov.includes('EOS')) {
              miningPowerData.eos.push({
                collection_name: prov[2],
                name: prov[3],
                template_id: prov[4],
                material: prov[7],
                mining_power: prov[8]
              });
            }

            if (prov.includes('Blockchain') && prov.includes('Collection')) {
              tableColumns = prov;
            }

            data.push(prov);

          }

          miningPowerData.eos.sort((a,b) => +b.mining_power - +a.mining_power);
          miningPowerData.wax.sort((a,b) => +b.mining_power - +a.mining_power);

          return miningPowerData;
        } catch (error) {
          console.log('error', error);
          return { eos: [], wax: []}
        }

      })
    )

    // return(data);
  }

}
