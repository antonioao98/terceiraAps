import React, { Component } from "react"

import { View, Text, TextInput, StyleSheet } from "react-native"

import { Picker } from "@react-native-picker/picker"

import Header from "./src/components/Header"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      periodo: "",
      turno: "",
      curso: "",
      cursos: [
        { key: 1, nome: "Sistemas de informação", valor: 600.00, periodo: 8},
        { key: 2, nome: "Adiministração", valor: 400.00, periodo: 10},
        { key: 3, nome: "Contábeis", valor: 200.00, periodo: 6,}
      ],
      turnos: [
        { key: 1, turno: "Noturno" },
        { key: 2, turno: "Diurno" }
      ]
    }
  }
  render() {
    let aux = []
    let nomePeriodoSelecionado = this.state.curso ? this.state.curso : ""
    for (let i = 0; i < this.state.cursos.length; i++) {
      if (this.state.cursos[i]) {
        for (let j = 0; j < this.state.cursos[i].periodo; j++) {
          if (this.state.cursos[i].nome == nomePeriodoSelecionado) {
            aux.push({ periodo: j + 1});
          }
        }
      }
    }

    let cursos = this.state.cursos.map((v, k) => {
      return <Picker.Item key={k} value={v.nome} label={v.nome} />
    })
    let periodo = aux.map((v, k) => {
      return <Picker.Item key={k} value={v.periodo} label={v.periodo.toString()} />
    })
    let turno = this.state.turnos.map((v, k) => {
      return <Picker.Item key={k} value={v.turno} label={v.turno} />
    })

    return (
      <View style={style.container}>
        <Header />
        <View style={style.containerDados}>
          <View>
            <Text style={[style.textAdd, { fontSize: 16, marginTop: "2%" }]}>Selecione os parâmentros:</Text>
            <View>
              <TextInput
                style={style.inputs}
                placeholder={"Digite seu nome"}
                onChangeText={(nomeDigitado) => this.setState({ nome: nomeDigitado })}
              />
              <View style={style.inputs}>
                <Picker
                  onValueChange={(cursoSel) => this.setState({ curso: cursoSel })}
                >
                  <Picker.Item value={""} label={"Selecione o curso"} />
                  {cursos}
                </Picker>
              </View>
              <View style={style.inputs}>
                <Picker
                  onValueChange={(periodoSelecionado) => this.setState({ periodo: periodoSelecionado })}
                >
                  <Picker.Item value={""} label={"Período"} />
                  {periodo}
                </Picker>
              </View>
              <View style={style.inputs}>
                <Picker
                  onValueChange={(turnoSelecionado) => this.setState({ turno: turnoSelecionado })}
                >
                  <Picker.Item value={""} label={"Turno"} />
                  {turno}
                </Picker>
              </View>
            </View>
          </View>
          <View style={style.dados2}>
            <Text style={[style.textAdd, { marginVertical: "8%" }]}>Informações Inseridas:</Text>
            <View style={{ flex: 1 }}>
              <View style={style.chaveValor}>
                <Text style={style.chave}>Nome:</Text>
                <Text style={{ marginLeft: 27 }}>{this.state.nome}</Text>
              </View>
              <View style={style.chaveValor}>
                <Text style={style.chave}>Cursos:</Text>
                <Text style={style.valor}>{this.state.curso}</Text>
              </View>
              <View style={{ flexDirection: "row", }}>
                <View style={[style.chaveValor, { flex: 1 }]}>
                  <Text style={style.chave}>Período:</Text>
                  <Text style={{ marginLeft: 15 }}>{this.state.periodo}</Text>
                </View>
                <View style={[style.chaveValor, { flex: 1 }]}>
                  <Text style={style.chave}>Turno:</Text>
                  <Text style={{ marginLeft: 15 }}>{this.state.turno}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  inputs: {
    borderRadius: 6,
    borderWidth: 1,
    marginTop: "3%",
  },
  textAdd: {
    fontSize: 22,
  },
  containerDados: {
    flex: 1,
    marginHorizontal: "8%"
  },
  dados2: {
    flex: 1,
  },
  chaveValor: {
    flexDirection: "row",
    marginBottom: "4%",
  },
  chave: {
    fontWeight: "bold"
  },
  valor: {
    marginLeft: 20
  },
})