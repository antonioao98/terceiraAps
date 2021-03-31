import React, { Component } from "react"

import { View, Text, TextInput, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from "react-native"

import { Picker } from "@react-native-picker/picker"

import Header from "./src/components/Header"

import Slider from '@react-native-community/slider';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      periodo: "",
      turno: "",
      curso: "",
      sexo: "",
      status: false,
      idade: "",
      valor: 0,
      statusInfo: false,
      sexos: [
        { key: 1, sexo: "Masculino" },
        { key: 2, sexo: "Feminino" }
      ],
      cursos: [
        { key: 1, nome: "Sistemas de informação", valor: 600.00, periodo: 8 },
        { key: 2, nome: "Adiministração", valor: 400.00, periodo: 10 },
        { key: 3, nome: "Contábeis", valor: 200.00, periodo: 6, }
      ],
      turnos: [
        { key: 1, turno: "Noturno" },
        { key: 2, turno: "Diurno" }
      ]
    }
    this.validarForm = this.validarForm.bind(this)
    this.confirmarDados = this.confirmarDados.bind(this)
  }
  validarForm() {
    if (this.state.nome && this.state.valor > 0 && this.state.periodo && this.state.turno && this.state.curso && this.state.sexo && this.state.idade) {
      Alert.alert("Dados salvos com sucesso !!")
      this.setState({ statusInfo: true })
    } else {
      Alert.alert("Por favor, preencha os campos !!")
    }
  }
  confirmarDados() {

    Alert.alert(
      "Atenção !!",
      "Deseja alterar os dados inseridos?",
      [
        {
          text: "Não",
          onPress: () => this.validarForm(),

        },
        { text: "Cancelar", onPress: () => console.log("Cancelar pressionado"), style: "cancel" }
      ]
    )

  }
  render() {
    let aux = []
    let nomePeriodoSelecionado = this.state.curso ? this.state.curso : ""
    for (let i = 0; i < this.state.cursos.length; i++) {
      if (this.state.cursos[i]) {
        for (let j = 0; j < this.state.cursos[i].periodo; j++) {
          if (this.state.cursos[i].nome == nomePeriodoSelecionado) {
            aux.push({ periodo: j + 1 });
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
    let sexo = this.state.sexos.map((v, k) => {
      return <Picker.Item key={k} value={v.sexo} label={v.sexo} />
    })

    return (
      <View style={style.container}>
        <Header />
        <ScrollView>
          <View style={style.containerDados}>
          {this.state.statusInfo ?
              <View style={style.dados2} >
                <Text style={[style.textAdd, { marginVertical: "8%" }]}>Informações Inseridas:</Text>
                <View style={{ flex: 1 }}>
                  <View style={style.chaveValor}>
                    <Text style={style.chave}>Nome:</Text>
                    <Text style={{ marginLeft: 27 }}>{this.state.nome}</Text>
                  </View>
                  <View style={style.chaveValor}>
                    <Text style={style.chave}>Idade:</Text>
                    <Text style={{ marginLeft: 29 }}>{this.state.idade}</Text>
                  </View>
                  <View style={style.chaveValor}>
                    <Text style={style.chave}>Sexo:</Text>
                    <Text style={{ marginLeft: 33 }}>{this.state.sexo}</Text>
                  </View>
                  <View style={style.chaveValor}>
                    <Text style={style.chave}>Cursos:</Text>
                    <Text style={style.valor}>{this.state.curso}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={[style.chaveValor, { flex: 1 }]}>
                      <Text style={style.chave}>Período:</Text>
                      <Text style={{ marginLeft: 15 }}>{this.state.periodo}</Text>
                    </View>
                    <View style={[style.chaveValor, { flex: 1 }]}>
                      <Text style={style.chave}>Turno:</Text>
                      <Text style={{ marginLeft: 15 }}>{this.state.turno}</Text>
                    </View>
                  </View>
                  <View style={style.chaveValor}>
                    <Text style={style.chave}>Renda:</Text>
                    <Text style={{marginLeft: 24}}>R$: {this.state.valor.toFixed()}</Text>
                  </View>
                  <View style={style.chaveValor}>
                    <Text style={style.chave}>Bolsista:</Text>
                    <Text style={{marginLeft: 12}}>{this.state.status ? "Sim" : "Não"}</Text>
                  </View>
                </View>
              </View>
              : <View></View>}
            <View>
              <Text style={[style.textAdd, { fontSize: 16, marginTop: "2%" }]}>Selecione os parâmentros:</Text>
              <View>
                <TextInput
                  style={style.inputs}
                  placeholder={"Digite seu nome"}
                  onChangeText={(nomeDigitado) => this.setState({ nome: nomeDigitado })}
                  value={this.state.statusInfo ? "" : this.state.nome }
                />
                <TextInput
                  style={style.inputs}
                  placeholder={"Digite a sua Idade"}
                  keyboardType="decimal-pad"
                  maxLength={2}
                  value={this.state.statusInfo ? "" : this.state.idade }
                  onChangeText={(IdadeDigitado) => this.setState({ idade: IdadeDigitado })}
                />
                <View style={style.inputs}>
                  <Picker
                    onValueChange={(sexoSelexionado) => this.setState({ sexo: sexoSelexionado })}
                    selectedValue={this.state.statusInfo ? "" : this.state.sexo}
                  >
                    <Picker.Item value={""} label={"Selecione o sexo"} />
                    {sexo}
                  </Picker>
                </View>
                <View style={style.inputs}>
                  <Picker
                    onValueChange={(cursoSel) => this.setState({ curso: cursoSel })}
                    selectedValue={this.state.statusInfo ? "" : this.state.curso}
                  >
                    <Picker.Item value={""} label={"Selecione o curso"} />
                    {cursos}
                  </Picker>
                </View>
                <View style={style.inputs}>
                  <Picker
                    onValueChange={(periodoSelecionado) => this.setState({ periodo: periodoSelecionado })}
                    selectedValue={this.state.statusInfo ? "" : this.state.periodo}
                  >
                    <Picker.Item value={""} label={"Período"} />
                    {periodo}
                  </Picker>
                </View>
                <View style={style.inputs}>
                  <Picker
                    onValueChange={(turnoSelecionado) => this.setState({ turno: turnoSelecionado })}
                    selectedValue={this.state.statusInfo ? "" : this.state.turno}
                  >
                    <Picker.Item value={""} label={"Turno"} />
                    {turno}
                  </Picker>
                </View>
                <View style={{ marginTop: "2%" }}>
                  <Text>Selecione sua renda:</Text>
                  <Slider
                    minimumValue={0}
                    maximumValue={10000}
                    onValueChange={(valorSelecionado) => this.setState({ valor: valorSelecionado })}
                    value={this.state.valor}
                    minimumTrackTintColor="#8EA0E5"
                    thumbTintColor="#5A6FBF"
                  />
                  <Text style={{ textAlign: "center" , fontWeight: "bold" }}>R$: {this.state.valor.toFixed(0)}</Text>
                </View>
                <View style={style.vSwitch}>
                  <Text>Já ganhou bolsa?</Text>
                  <View >
                    <Switch
                      value={this.state.status}
                      onValueChange={(valorSwitch) => this.setState({ status: valorSwitch })}
                      thumbColor="#447EFC"
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={style.btnSalvar}
                  onPress={() => this.confirmarDados()}
                >
                  <Text style={style.txtBtn}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </ScrollView>
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
    marginHorizontal: "8%",
  },
  dados2: {
    flex: 1,
  },
  chaveValor: {
    flexDirection: "row",
    marginBottom: "4%",
  },
  chave: {
    fontWeight: "bold",
  },
  valor: {
    marginLeft: 20,
  },
  btnSalvar: {
    backgroundColor: "blue",
    borderRadius: 4,
    marginHorizontal: "40%",
    padding: "3%"
  },
  txtBtn: {
    textAlign: "center",
    color: "white"
  },
  vSwitch: {
    marginTop: "2%",
    alignItems: "flex-start"
  }
})