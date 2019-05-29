import { observable, action, toJS, values } from 'mobx';
import * as Papa from 'papaparse';
import * as math from 'mathjs'

class Storage {
    @observable csvFilePath: string = '/data/fest-responses-v2.csv';
    @observable csvDataLines: any = [];
    @observable csvPopulation: any = [];
    @observable cosineResultsData: any = [];
    @observable cosineRanking: any = [];
    @observable imgArray: any = [];
    @observable csvSelected: number = 1;
    @observable csvSelectedGroup: any = [];

    constructor() {
        this.csvGetData = this.csvGetData.bind(this);
        this.cosineSingularityGeneral = this.cosineSingularityGeneral.bind(this);
        this.csvGetPopulation = this.csvGetPopulation.bind(this);
        this.csvFest = this.csvFest.bind(this);

        this.imgArray = ["https://react.semantic-ui.com/images/avatar/small/helen.jpg", "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
            "https://react.semantic-ui.com/images/avatar/small/daniel.jpg", "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
            "https://react.semantic-ui.com/images/avatar/small/elliot.jpg", "https://react.semantic-ui.com/images/avatar/small/tom.jpg",
            "https://react.semantic-ui.com/images/avatar/small/christian.jpg", "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
            "https://react.semantic-ui.com/images/avatar/small/lena.png", "https://react.semantic-ui.com/images/avatar/small/lindsay.png",
            "https://react.semantic-ui.com/images/avatar/small/mark.png", "https://react.semantic-ui.com/images/avatar/small/molly.png",
            "https://react.semantic-ui.com/images/avatar/small/rachel.png", "https://react.semantic-ui.com/images/avatar/small/lindsay.png",
            "https://react.semantic-ui.com/images/avatar/small/matthew.png", "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
            "https://react.semantic-ui.com/images/avatar/small/veronika.jpg"];
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
        let indexArray = 0;
        this.csvDataLines.forEach((element: any) => {
            let score = [];

            let scoreByGenres = [];
            let scoreByGenresAvg;
            let scoreByGenresMedian;
            let scoreByGenresMin;
            let scoreByGenresMax;

            let scoreByArtists = [];
            let scoreByArtistsAvg;
            let scoreByArtistsMedian;
            let scoreByArtistsMin;
            let scoreByArtistsMax;

            let scoreByFood = [];
            let scoreByFoodAvg;
            let scoreByFoodMedian;
            let scoreByFoodMin;
            let scoreByFoodMax;

            let scoreByDrink = [];
            let scoreByDrinkAvg;
            let scoreByDrinkMedian;
            let scoreByDrinkMin;
            let scoreByDrinkMax;

            let scoreByDiet = [];
            let scoreByDietAvg;
            let scoreByDietMedian;
            let scoreByDietMin;
            let scoreByDietMax;

            for (let index = 0; index < this.csvDataLines[0].length; index++) {
                let scoreData = {
                    catName: this.csvDataLines[0][index],
                    score: element[index],
                }
                score.push(scoreData);
            }

            scoreByGenres = score.slice(3, 19);
            scoreByGenresMedian = this.medianByArray(scoreByGenres);
            scoreByGenresMin = this.leastMiseryByArray(scoreByGenres);
            scoreByGenresMax = this.mostPleasureByArray(scoreByGenres);
            scoreByGenresAvg = this.averageByArray(scoreByGenres);

            scoreByArtists = score.slice(19, 65);
            scoreByArtistsMedian = this.medianByArray(scoreByArtists);
            scoreByArtistsMin = this.leastMiseryByArray(scoreByArtists);
            scoreByArtistsMax = this.mostPleasureByArray(scoreByArtists);
            scoreByArtistsAvg = this.averageByArray(scoreByArtists);

            scoreByDiet = score.slice(65, 68);
            scoreByDietMedian = this.medianByArray(scoreByDiet);
            scoreByDietMin = this.leastMiseryByArray(scoreByDiet);
            scoreByDietMax = this.mostPleasureByArray(scoreByDiet);
            scoreByDietAvg = this.averageByArray(scoreByDiet);

            scoreByFood = score.slice(68, 94);
            scoreByFoodMedian = this.medianByArray(scoreByFood);
            scoreByFoodMin = this.leastMiseryByArray(scoreByFood);
            scoreByFoodMax = this.mostPleasureByArray(scoreByFood);
            scoreByFoodAvg = this.averageByArray(scoreByFood);

            scoreByDrink = score.slice(94, 110);
            scoreByDrinkMedian = this.medianByArray(scoreByDrink);
            scoreByDrinkMin = this.leastMiseryByArray(scoreByDrink);
            scoreByDrinkMax = this.mostPleasureByArray(scoreByDrink);
            scoreByDrinkAvg = this.averageByArray(scoreByDrink);

            let random = Math.floor(Math.random() * (this.imgArray.length - 0)) + 0;


            var population = {
                name: element[1],
                age: element[2],
                index: indexArray,
                img: this.imgArray[random],

                score: score,

                scoreByGenres: scoreByGenres,
                scoreByGenresMedian: scoreByGenresMedian,
                scoreByGenresMin: scoreByGenresMin,
                scoreByGenresMax: scoreByGenresMax,
                scoreByGenresAvg: scoreByGenresAvg,

                scoreByArtists: scoreByArtists,
                scoreByArtistsMedian: scoreByArtistsMedian,
                scoreByArtistsMin: scoreByArtistsMin,
                scoreByArtistsMax: scoreByArtistsMax,
                scoreByArtistsAvg: scoreByArtistsAvg,

                scoreByDiet: scoreByDiet,
                scoreByDietMedian: scoreByDietMedian,
                scoreByDietMin: scoreByDietMin,
                scoreByDietMax: scoreByDietMax,
                scoreByDietAvg: scoreByDietAvg,

                scoreByFood: scoreByFood,
                scoreByFoodMedian: scoreByFoodMedian,
                scoreByFoodMin: scoreByFoodMin,
                scoreByFoodMax: scoreByFoodMax,
                scoreByFoodAvg: scoreByFoodAvg,

                scoreByDrink: scoreByDrink,
                scoreByDrinkMedian: scoreByDrinkMedian,
                scoreByDrinkMin: scoreByDrinkMin,
                scoreByDrinkMax: scoreByDrinkMax,
                scoreByDrinkAvg: scoreByDrinkAvg,
            }

            this.csvPopulation.push(population);
            indexArray += 1;
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

    @action csvFest(dataArray: {}[]) {
        let sum = 0;
        dataArray.forEach((element: any) => {
            for (let index = 0; index < dataArray.length; index++) {
                sum += parseInt(element.score[index].score);
                console.log(sum);
            }
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

            let scoreFinal;

            let scoreByGenresValues = [];
            let scoreByGenresValuesAvg: undefined | any;
            let scoreByGenresValuesMedian;
            let scoreByGenresValuesMin;
            let scoreByGenresValuesMax;
            let scoreByGenresValuesStd;

            let scoreByArtistsValues = [];
            let scoreByArtistsValuesAvg: undefined | any;
            let scoreByArtistsValuesMedian;
            let scoreByArtistsValuesMin;
            let scoreByArtistsValuesMax;
            let scoreByArtistsValuesStd;

            let scoreByFoodValues = [];
            let scoreByFoodValuesAvg: undefined | any;
            let scoreByFoodValuesMedian;
            let scoreByFoodValuesMin;
            let scoreByFoodValuesMax;
            let scoreByFoodValuesStd;

            let scoreByDrinkValues = [];
            let scoreByDrinkValuesAvg: undefined | any;
            let scoreByDrinkValuesMedian;
            let scoreByDrinkValuesMin;
            let scoreByDrinkValuesMax;
            let scoreByDrinkValuesStd;

            let scoreByDietValues = [];
            let scoreByDietValuesAvg: undefined | any;
            let scoreByDietValuesMedian;
            let scoreByDietValuesMin;
            let scoreByDietValuesMax;
            let scoreByDietValuesStd;


            for (let indexB = 2; indexB < d2.length; indexB++) {
                sumD1D2 += (parseInt(d1[indexB]) * parseInt(d2[indexB]));
                sumD1 += (parseInt(d1[indexB]) * parseInt(d1[indexB]));
                sumD2 += (parseInt(d2[indexB]) * parseInt(d2[indexB]));

                magD1 = Math.abs(Math.sqrt(sumD1));
                magD2 = Math.abs(Math.sqrt(sumD2));

                let result = (sumD1D2 / (magD1 * magD2)) * 100;

                //console.log(result);

                let resultData = {
                    catName: this.csvDataLines[0][indexB],
                    score: result,
                }

                cosineResults.push(resultData);
            }

            scoreByGenresValues = cosineResults.slice(1, 17);
            scoreByGenresValuesMedian = this.medianByArray(scoreByGenresValues);
            scoreByGenresValuesMin = this.leastMiseryByArrayCosine(scoreByGenresValues).slice(0, 5);
            scoreByGenresValuesMax = this.mostPleasureByArrayCosine(scoreByGenresValues).slice(0, 5);
            scoreByGenresValuesAvg = this.averageByArray(scoreByGenresValues);
            scoreByGenresValuesStd = this.standardDerivation(scoreByGenresValues);

            scoreByArtistsValues = cosineResults.slice(17, 63);
            scoreByArtistsValuesMedian = this.medianByArray(scoreByArtistsValues);
            scoreByArtistsValuesMin = this.leastMiseryByArrayCosine(scoreByArtistsValues).slice(0, 5);
            scoreByArtistsValuesMax = this.mostPleasureByArrayCosine(scoreByArtistsValues).slice(0, 5);
            scoreByArtistsValuesAvg = this.averageByArray(scoreByArtistsValues);
            scoreByArtistsValuesStd = this.standardDerivation(scoreByArtistsValues);

            scoreByDietValues = cosineResults.slice(63, 66);
            scoreByDietValuesMedian = this.medianByArray(scoreByDietValues);
            scoreByDietValuesMin = this.leastMiseryByArrayCosine(scoreByDietValues).slice(0, 5);
            scoreByDietValuesMax = this.mostPleasureByArrayCosine(scoreByDietValues).slice(0, 5);
            scoreByDietValuesAvg = this.averageByArray(scoreByDietValues);
            scoreByDietValuesStd = this.standardDerivation(scoreByDietValues);

            scoreByFoodValues = cosineResults.slice(66, 92);
            scoreByFoodValuesMedian = this.medianByArray(scoreByFoodValues);
            scoreByFoodValuesMin = this.leastMiseryByArrayCosine(scoreByFoodValues).slice(0, 5);
            scoreByFoodValuesMax = this.mostPleasureByArrayCosine(scoreByFoodValues).slice(0, 5);
            scoreByFoodValuesAvg = this.averageByArray(scoreByFoodValues);
            scoreByFoodValuesStd = this.standardDerivation(scoreByFoodValues);

            scoreByDrinkValues = cosineResults.slice(92, 108);
            scoreByDrinkValuesMedian = this.medianByArray(scoreByDrinkValues);
            scoreByDrinkValuesMin = this.leastMiseryByArrayCosine(scoreByDrinkValues).slice(0, 5);
            scoreByDrinkValuesMax = this.mostPleasureByArrayCosine(scoreByDrinkValues).slice(0, 5);
            scoreByDrinkValuesAvg = this.averageByArray(scoreByDrinkValues);
            scoreByDrinkValuesStd = this.standardDerivation(scoreByDrinkValues);

            scoreFinal = ((scoreByGenresValuesAvg + scoreByArtistsValuesAvg + scoreByDietValuesAvg + scoreByFoodValuesAvg + scoreByDrinkValuesAvg) / 5);

            var cosineResultsObj = {
                name: d2[1],
                age: d2[2],
                cosineResults: cosineResults,

                scoreByGenresValues: scoreByGenresValues,
                scoreByGenresValuesMedian: scoreByGenresValuesMedian,
                scoreByGenresValuesMin: scoreByGenresValuesMin,
                scoreByGenresValuesMax: scoreByGenresValuesMax,
                scoreByGenresValuesAvg: scoreByGenresValuesAvg,
                scoreByGenresValuesStd: scoreByGenresValuesStd,

                scoreByArtistsValues: scoreByArtistsValues,
                scoreByArtistsValuesMedian: scoreByArtistsValuesMedian,
                scoreByArtistsValuesMin: scoreByArtistsValuesMin,
                scoreByArtistsValuesMax: scoreByArtistsValuesMax,
                scoreByArtistsValuesAvg: scoreByArtistsValuesAvg,
                scoreByArtistsValuesStd: scoreByArtistsValuesStd,

                scoreByDietValues: scoreByDietValues,
                scoreByDietValuesMedianMedian: scoreByDietValuesMedian,
                scoreByDietValuesMin: scoreByDietValuesMin,
                scoreByDietValuesMax: scoreByDietValuesMax,
                scoreByDietValuesAvg: scoreByDietValuesAvg,
                scoreByDietValuesStd: scoreByDietValuesStd,

                scoreByFoodValues: scoreByFoodValues,
                scoreByFoodValuesMedian: scoreByFoodValuesMedian,
                scoreByFoodValuesMin: scoreByFoodValuesMin,
                scoreByFoodValuesMax: scoreByFoodValuesMax,
                scoreByFoodValuesAvg: scoreByFoodValuesAvg,
                scoreByFoodValuesStd: scoreByFoodValuesStd,

                scoreByDrinkValues: scoreByDrinkValues,
                scoreByDrinkValuesMedian: scoreByDrinkValuesMedian,
                scoreByDrinkValuesMin: scoreByDrinkValuesMin,
                scoreByDrinkValuesMax: scoreByDrinkValuesMax,
                scoreByDrinkValuesAvg: scoreByDrinkValuesAvg,
                scoreByDrinkValuesStd: scoreByDrinkValuesStd,

                scoreFinal: scoreFinal,
            }
            this.cosineResultsData.push(cosineResultsObj);
        }
        this.cosineRanking = this.rankingByArrayCosine(this.cosineResultsData);
        console.log(toJS(this.cosineResultsData));
        console.log(toJS(this.cosineRanking));
    }

    @action medianByArray(dataArray: {}[]) {
        let dataArrayValues: any = [];
        dataArray.forEach((element: any) => {
            dataArrayValues.push(parseFloat(element.score));
        });

        //console.log(dataArrayValues);
        dataArrayValues.sort(function (a: any, b: any) { return a - b });

        var half = Math.floor(dataArrayValues.length / 2);

        if (dataArrayValues.length % 2) {
            return dataArrayValues[half];
        } else {
            return (dataArrayValues[half + 1] + dataArrayValues[half]) / 2.0;
        }
    }

    @action rankingByArrayCosine(dataArray: any) {
        return dataArray.sort((a: any, b: any) => (a.scoreFinal < b.scoreFinal) ? 1 : -1);
    }

    @action leastMiseryByArrayCosine(dataArray: any) {
        return dataArray.sort((a: any, b: any) => (a.score > b.score) ? 1 : -1);
    }

    @action mostPleasureByArrayCosine(dataArray: any) {
        return dataArray.sort((a: any, b: any) => (a.score < b.score) ? 1 : -1);
    }

    @action leastMiseryByArray(dataArray: any) {
        return dataArray.filter((a: any) => a.score <= 1);
    }

    @action mostPleasureByArray(dataArray: any) {
        return dataArray.filter((a: any) => a.score >= 5);
    }

    @action averageByArray(dataArray: any) {
        if (dataArray.length === 0) return;
        let sum = 0;
        let avg = 0;
        dataArray.forEach((element: any) => {
            sum += parseInt(element.score);
        });
        avg = sum / dataArray.length;

        return avg;
    }

    @action standardDerivation(dataArray: any) {
        let dataArrayValues: any = [];
        dataArray.forEach((element: any) => {
            dataArrayValues.push(parseFloat(element.score));
        });
        return math.std(dataArrayValues);
    }
}

const storage = new Storage();
export default storage;