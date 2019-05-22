import { observable, action, toJS } from 'mobx';
import * as Papa from 'papaparse';

class Storage {
    @observable csvFilePath: string = '/data/fest-responses-v1.csv';
    @observable csvDataLines: any = [];
    @observable cosineResultsData: any = [];

    constructor() {
        this.csvGetData = this.csvGetData.bind(this);
        this.cosineSingularityGeneral = this.cosineSingularityGeneral.bind(this);
    }

    //* Realiza el fecth donde de manera asíncrona se hace la petición
    //  localmente sobre el archivo CSV, luego de esto, se codifica en UTF-8
    @action csvFetch() {
        return fetch(this.csvFilePath).then(function (response: any) {
            let csvReader = response.body.getReader();
            let csvDecoder = new TextDecoder('utf-8');

            return csvReader.read().then(function (result: any) {
                return csvDecoder.decode(result.value);
            });
        });
    }

    //* En este método que se ejecuta tras la promesa del fetch, se agrega cada
    //  línea como un sujeto independiente que permitirá la consulta como matriz
    @action csvGetData(result: any) {
        if (result.data && result.data !== null && result.data !== undefined) {
            result.data.forEach((element: any) => {
                if (element !== undefined) {
                    //console.log(element);
                    this.csvDataLines.push(element);
                }
            });
            //console.log(this.csvDataLines[0][1]);
        }
    }

    //* Método asíncrono que cuando se complete la petición realizará el Parse del CSV a texto
    async csvGetDataAsync() {
        let csvData = await this.csvFetch();

        Papa.parse(csvData, {
            complete: this.csvGetData
        });
    }

    @action cosineSingularityGeneral(userIndex: number) {
        if (this.csvDataLines.length === 0) return;
        let d1 = this.csvDataLines[userIndex];
        console.log("This is the user", d1);
        for (let index = 1; index < this.csvDataLines.length; index++) {
            let d2 = this.csvDataLines[index];
            
            var cosineResults = [];
            
            var sumD1D2 = 0;
            var sumD1 = 0;
            var sumD2 = 0;
            var magD1 = 0;
            var magD2 = 0;

            for (let indexB = 2; indexB < d2.length; indexB++) {
                sumD1D2 += (parseInt(d1[indexB]) * parseInt(d2[indexB]));
                sumD1 += (parseInt(d1[indexB]) * parseInt(d1[indexB]));
                sumD2 += (parseInt(d2[indexB]) * parseInt(d2[indexB]));

                magD1 = Math.abs(Math.sqrt(sumD1));
                magD2 = Math.abs(Math.sqrt(sumD2));

                let result = sumD1D2 / (magD1 * magD2);

                //console.log(result);

                cosineResults.push(result);
            }
            var cosineResultsObj = {
                name: d2[1],
                age: d2[2],
                cosineResults: cosineResults,
            }
            this.cosineResultsData.push(cosineResultsObj);
        }
        console.log(toJS(this.cosineResultsData));
    }
}

const storage = new Storage();
export default storage;