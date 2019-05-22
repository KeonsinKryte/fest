import { observable, action } from 'mobx';
import * as Papa from 'papaparse';

class Storage {
    @observable csvFilePath: string = '/data/fest-responses-v1.csv';
    @observable csvDataLines: any = [];

    constructor() {
        this.csvGetData = this.csvGetData.bind(this);
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
                    console.log(element);
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
        let d1 = this.csvDataLines[userIndex]
        if (this.csvDataLines) {
            for (let index = 1; index < this.csvDataLines.length; index++) {
                let d2 = this.csvDataLines[index];
                var sumD1D2 = 0;
                var sumD1 = 0;
                var sumD2 = 0;
                var magD1 = 0;
                var magD2 = 0;

                let cosineResults = [];

                for (let indexB = 1; indexB < d1.length; indexB++) {
                    sumD1D2 += (parseInt(d1[indexB]) * parseInt(d2[indexB]));
                    sumD1 += (parseInt(d1[indexB]) * parseInt(d1[indexB]));
                    sumD2 += (parseInt(d2[indexB]) * parseInt(d2[indexB]));

                    magD1 = Math.abs(Math.sqrt(sumD1));
                    magD2 = Math.abs(Math.sqrt(sumD2));

                    cosineResults.push(sumD1D2 / (magD1 * magD2));
                }
                console.log(cosineResults);
            }
        }
    }
}

const storage = new Storage();
export default storage;