import React, { Component } from 'react';
import { action } from 'mobx';
import * as Papa from 'papaparse';

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
    this.csvGetDataAsync();
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
    result.data.forEach(function(element: any){
      csvDataLines.push(element);
      
    });
    console.log(csvDataLines[0][1]);
  }

  @action CosineSingularityByMusicGenre(valueByUser: number, userIndex: number) {
    if(csvDataLines){
      console.log(csvDataLines[5][0]);
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

export default App;
