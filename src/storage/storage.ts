import { observable, action, toJS, values } from 'mobx';
import * as Papa from 'papaparse';

class Storage {
    @observable csvFilePath: string = '/data/fest-responses-v1.csv';
    @observable csvDataLines: any = [];
    @observable csvPopulation: any = [];
    @observable cosineResultsData: any = [];

    constructor() {
        this.csvGetData = this.csvGetData.bind(this);
        this.cosineSingularityGeneral = this.cosineSingularityGeneral.bind(this);
        this.csvGetPopulation = this.csvGetPopulation.bind(this);
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

    @action csvGetPopulation() {
        if (this.csvDataLines === 0) return;
        this.csvDataLines.forEach((element: any) => {
            let score = [];
            let scoreByGenres = [];
            let scoreByArtists = [];
            let scoreByFood = [];
            let scoreByDrink = [];
            let scoreByDiet = [];

            for (let index = 0; index < this.csvDataLines[0].length; index++) {
                let scoreData = {
                    catName: this.csvDataLines[0][index],
                    score: element[index],
                }

                score.push(scoreData);
            }

            scoreByGenres = score.slice(3, 19);
            scoreByArtists = score.slice(19, 65);
            scoreByDiet = score.slice(65, 68);
            scoreByFood = score.slice(68, 94);
            scoreByDrink = score.slice(94, 110);

            var population = {
                name: element[1],
                age: element[2],
                scoreByGenres: scoreByGenres,
                scoreByArtists: scoreByArtists,
                scoreByDiet: scoreByDiet,
                scoreByFood: scoreByFood,
                scoreByDrink: scoreByDrink,
            }

            this.csvPopulation.push(population);
        });
        console.log(toJS(this.csvPopulation));
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
        //console.log("This is the user", d1);
        for (let index = 1; index < this.csvDataLines.length; index++) {
            let d2 = this.csvDataLines[index];

            var cosineResults = [];

            var sumD1D2 = 0;
            var sumD1 = 0;
            var sumD2 = 0;
            var magD1 = 0;
            var magD2 = 0;

            let scoreByGenresValues = [];
            let scoreByGenresValuesAvg;
            let scoreByGenresValuesMedian;
            let scoreByGenresValuesMin = [];
            let scoreByGenresValuesMax = [];

            let scoreByArtistsValues = [];
            let scoreByArtistsValuesAvg;
            let scoreByArtistsValuesMedian;
            let scoreByArtistsValuesMin = [];
            let scoreByArtistsValuesMax = [];

            let scoreByFoodValues = [];
            let scoreByFoodValuesAvg;
            let scoreByFoodValuesMedian;
            let scoreByFoodValuesMin = [];
            let scoreByFoodValuesMax = [];

            let scoreByDrinkValues = [];
            let scoreByDrinkValuesAvg;
            let scoreByDrinkValuesMedian;
            let scoreByDrinkValuesMin = [];
            let scoreByDrinkValuesMax = [];

            let scoreByDietValues = [];
            let scoreByDietValuesAvg;
            let scoreByDietValuesMedian;
            let scoreByDietValuesMin = [];
            let scoreByDietValuesMax = [];


            for (let indexB = 2; indexB < d2.length; indexB++) {
                sumD1D2 += (parseInt(d1[indexB]) * parseInt(d2[indexB]));
                sumD1 += (parseInt(d1[indexB]) * parseInt(d1[indexB]));
                sumD2 += (parseInt(d2[indexB]) * parseInt(d2[indexB]));

                magD1 = Math.abs(Math.sqrt(sumD1));
                magD2 = Math.abs(Math.sqrt(sumD2));

                let result = sumD1D2 / (magD1 * magD2);

                //console.log(result);

                let resultData = {
                    catName: this.csvDataLines[0][indexB],
                    score: result,
                }

                cosineResults.push(resultData);
            }

            scoreByGenresValues = cosineResults.slice(1, 17);
            scoreByGenresValuesMedian = this.medianByArray(scoreByGenresValues);
            scoreByArtistsValues = cosineResults.slice(17, 63);
            scoreByDietValues = cosineResults.slice(63, 66);
            scoreByFoodValues = cosineResults.slice(66, 92);
            scoreByDrinkValues = cosineResults.slice(92, 108);

            var cosineResultsObj = {
                name: d2[1],
                age: d2[2],
                cosineResults: cosineResults,
                scoreByGenresValues: scoreByGenresValues,
                scoreByGenresValuesMedian: scoreByGenresValuesMedian,
                scoreByArtistsValues: scoreByArtistsValues,
                scoreByDiet: scoreByDietValues,
                scoreByFoodValues: scoreByFoodValues,
                scoreByDrinkValues: scoreByDrinkValues,
            }
            this.cosineResultsData.push(cosineResultsObj);
        }
        console.log(toJS(this.cosineResultsData));
    }

    @action medianByArray(dataArray: {}[]) {
        let dataArrayValues: any = [];
        dataArray.forEach((element: any) => {
            dataArrayValues.push(element.score);
        });

        dataArrayValues.sort(function (a: any, b: any) { return a - b });

        var half = Math.floor(dataArrayValues.length / 2);

        if (dataArrayValues.length % 2) {
            return dataArrayValues[half];
        } else {
            return (dataArrayValues[half + 1] + dataArrayValues[half]) / 2.0;
        }
    }
}

const storage = new Storage();
export default storage;