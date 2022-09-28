import React from 'react';
import './App.css';
import InputComponent from './Components/Input';
import RewardCard from './Components/RewardCard';
import axios from "axios"
import { useForm } from "react-hook-form";

interface IResponseObject {
  1: number
  15: number
  30: number
  90: number
}

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [responseObject, setResponseObject] = React.useState<IResponseObject>()

  const onSubmitFunction = async(data: any) => {
    await axios.post('https://frontend-challenge-7bu3nxh76a-uc.a.run.app', data)
    .then((response) => setResponseObject(response.data))
    .catch((err)=> console.log(err))
  }
  
  return (
    <div className="App">
      <div className="container">
        <div className="container--left">
        <h1>Simule sua antecipação</h1>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <InputComponent register={register} label={"Informe o valor da venda *"} name={"amount"} />
          <InputComponent register={register} label={"Em quantas parcelas *"} name={"installments"} />
          <InputComponent register={register} label={"Informe o percentual de MDR*"} name={"mdr"} />
          <button type='submit'></button>
        </form>
        </div>
        <div className="container--rigth">
          <h2>VOCÊ RECEBERÁ</h2>
          <RewardCard date={"Amanhã"} value={responseObject && Object.values(responseObject)[0]}/>
          <RewardCard date={"Em 15 dias"} value={responseObject && Object.values(responseObject)[1]}/>
          <RewardCard date={"Em 30 dias"} value={responseObject && Object.values(responseObject)[2]}/>
          <RewardCard date={"Em 90 dias"} value={responseObject && Object.values(responseObject)[3]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
