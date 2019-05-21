import React, { Component } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as Papa from 'papaparse';
import Storage from '../../storage/storage';

//* Ruta del archivo, PD* TIENE QUE ESTAR EN PUBLIC SI NO NO SIRVE
var csvFilePath = '/data/fest-responses-v1.csv';
//* Este arreglo guardará cada una de las líneas por persona que salen del CSV
var csvDataLines: any = [];
var csvData: any = [];


class App extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      data: []
    }
    this.csvGetData = this.csvGetData.bind(this);
  }

  //* Ejecutará el métdo asíncrono, ya que se usa Fetch
  componentWillMount() {
    Storage.csvGetDataAsync();
  }

  //* Realiza el fecth donde de manera asíncrona se hace la petición
  //  localmente sobre el archivo CSV, luego de esto, se codifica en UTF-8
  @action csvfetch() {
    return fetch(csvFilePath).then(function (response: any) {
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
    this.setState({ data: result.data });
    result.data.forEach(function (element: any) {
      csvDataLines.push(element);
    });

    this.CosineSingularityByMusicGenre(2);
  }

  @action CosineSingularityByMusicGenre(userIndex: number) {
    let d1 = csvDataLines[userIndex].slice(3, 19);
    if (csvDataLines) {
      for (let index = 1; index < csvDataLines.length; index++) {
        let d2 = csvDataLines[index].slice(3, 19);
        var sumD1D2 = 0;
        var sumD1 = 0;
        var sumD2 = 0;
        var magD1 = 0;
        var magD2 = 0;

        let cosineResults = [];
        for (let indexB = 0; indexB < d1.length; indexB++) {
          sumD1D2 += (parseInt(d1[indexB]) * parseInt(d2[indexB]));
          sumD1 += (parseInt(d1[indexB]) * parseInt(d1[indexB]));
          sumD2 += (parseInt(d2[indexB]) * parseInt(d2[indexB]));


          magD1 = Math.abs(Math.sqrt(sumD1));
          magD2 = Math.abs(Math.sqrt(sumD2));

          cosineResults.push(sumD1D2 / (magD1 * magD2));
        }
        console.log(cosineResults);

        return cosineResults;
      }
    }
  }

  //* Método asíncrono que cuando se complete la petición realizará el Parse del CSV a texto
  async csvGetDataAsync() {
    let csvData = await this.csvfetch();

    Papa.parse(csvData, {
      complete: this.csvGetData
    });
  }

  render() {
    return (
      <div>
        <h1>{}</h1>
      </div>
    );
  }
}

export default observer(App);
