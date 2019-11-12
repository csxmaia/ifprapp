import React from "react"
import { View, Alert, Text} from "react-native"
import { Input, Icon } from "react-native-elements"
import { MaskService } from 'react-native-masked-text'
import { Actions } from "react-native-router-flux"
import Rest from "../components/Rest"
import Tooltip from 'react-native-walkthrough-tooltip'
import Styles from "../components/Styles"
import Button from "../components/Button"

const Api = new Rest()

export default class Validacao extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            resp: "",
            cpf: "",
            ra: "",
            dtnasc: "",
            cpfvalidate: false,
            //Dados ficticios de como os dados chegarão na state após consulta ao banco via api
            responsaveis: [
                {
                    "id": "1",
                    "nome": "Fulano Responsavel 1"
                },
                {
                    "id": "2",
                    "nome": "Ciclano Responsavel 1"
                }
            ],
            registro: [
                {
                    "id": "2019000112",
                    "nome": "Cristhian da Silveira Maia"
                },
                {
                    "id": "2019001919",
                    "nome": "joao Gabriel"
                }
            ]
        }
    }


    submitForm = () => {
        // this.checkEmpty()
        
        // Api.sendData("1", "2", "3", "4")
        // .then(resposta => resposta)
        // .catch(err => console.warn(err))

        Api.testeGet().then(resp => console.warn(resp)).catch(err => console.warn(err))

    }

    //Mascara Campo CPF
    handleCpf = (value) => {
        var cpf = MaskService.toMask('cpf', value, {})
        this.setState({cpf: cpf})

        var validate = MaskService.isValid('cpf', cpf, {})
        this.setState({cpfvalidate: validate})
    }
    //Marcara Campo Data de Nascimento
    handleDtnasc = (value) => {
        var data = MaskService.toMask('datetime', value, {
            format: 'DD/MM/YYYY'
        })
        this.setState({dtnasc: data})
    }
    
    checkEmpty = () => {
        if (this.state.resp && this.state.cpf && this.state.ra && this.state.dtnasc) {
            Actions.cadastro()
        }
        else {
            Alert.alert("Erro", "Preencha todos os campos.")
        }
    }

    render(){
        const cpfvalidate = this.state.cpfvalidate
        return(
            <View style={Styles.container}>
                <Input 
                    label="Nome do Responsável"
                    inputContainerStyle={Styles.input}
                    labelStyle={{color: "green"}}
                    maxLength={60}
                    onChangeText={(value) => this.setState({ resp: value })}
                />

                <Input 
                    label="CPF"
                    keyboardType="numeric"
                    inputContainerStyle={Styles.input}
                    labelStyle={{color: "green"}}
                    onChangeText={(value) => this.handleCpf(value)}
                    value={this.state.cpf}
                    maxLength={14}
                    placeholder="000.000.000-00"
                    rightIcon={
                        <Icon
                            name={this.state.cpfvalidate ? "checkcircle" : "closecircleo"}
                            type="antdesign"
                            color={this.state.cpfvalidate? "green" : "red"}
                        />
                    }
                    />

                <Input 
                    label="RA (Registro Acadêmico)"
                    keyboardType="numeric"
                    inputContainerStyle={Styles.input}
                    labelStyle={{color: "green"}}
                    onChangeText={(value) => this.setState({ ra: value })}
                    maxLength={15}
                    rightIcon={
                        <Tooltip
                            isVisible={this.state.toolTipVisible}
                            contentStyle={{height: "auto"}}
                            content={
                                <Text>O RA (Numero de Matricula) pode ser encontrado no sistema academico 
                                    SIGAA (sigaa.ifpr.edu.br) ou na Secretária do seu campus.</Text>
                                }
                            placement="left"
                            onClose={() => this.setState({ toolTipVisible: false })}
                        >
                            <Icon
                                onPress={() => this.setState({ toolTipVisible: true })}
                                name="questioncircleo"
                                type="antdesign"
                                color="green"
                            />
                        </Tooltip>
                    }
                />

                <Input 
                    label="Data de Nascimento"
                    keyboardType="numeric"
                    inputContainerStyle={Styles.input}
                    labelStyle={{color: "green"}}
                    onChangeText={(value) => this.handleDtnasc(value)}
                    value={this.state.dtnasc}
                    maxLength={10}
                    placeholder="Ex: dd/mm/aaaa"
                />

                <Button 
                    title={"Próximo"}
                    name="arrowright"
                    type="antdesign"
                    onPress={() => this.submitForm()}
                />

            </View>
        )
    }
}