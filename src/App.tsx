import React, { useContext } from 'react';
import './App.css';
import InputComponent from './Components/Input';
import RewardCard from './Components/RewardCard';
import axios from "axios"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import load from "./assets/load.svg"
import { AppContext } from './contexts/app.context';
import { Toaster } from 'react-hot-toast';

interface IResponse {
  amount: number
  installments: number
  mdr: number
  days?: any
}

function App() {

  const formSchema = yup.object().shape({
    amount: yup.string().required("Campo obrigatório!"),
    installments: yup.string().required("Campo obrigatório!").matches(/(^0?[1-9]$)|(^1[0-2]$)/, 'Apenas números entre 1 e 12'),
    mdr: yup.string().required("Campo obrigatório!").matches(/^[1-9][0-9]?$|^100$/, 'Apenas números entre 1 e 100'),
    days: yup.string().matches(/^(([0-9 ](,)?)*)+$/, 'Siga o exemplo: 10, 15, 25')
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IResponse>({ resolver: yupResolver(formSchema) });
  const { setIsLoading, formatData, handleResponse, isLoading, isDaysOn, isResponseOn, responseObject, ajustAmount, handleError } = useContext(AppContext);

  const onSubmitFunction = async (data: any) => {
    setIsLoading(true)
    let amountAjustedData = ajustAmount(data)
    let newData = formatData(amountAjustedData)

    await axios.post('https://frontend-challenge-7bu3nxh76a-uc.a.run.app', newData)
      .then((response) => handleResponse(response.data))
      .catch((err) => handleError(err.response))
  }

  return (
    <div className="App">
      <div className="container">
        <div className="container--left">
          <h1>Simule sua antecipação</h1>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <InputComponent error={errors.amount?.message} register={register} label={"Informe o valor da venda *"} name={"amount"} />
            <InputComponent error={errors.installments?.message} register={register} label={"Em quantas parcelas *"} name={"installments"} />
            <InputComponent error={errors.mdr?.message} register={register} label={"Informe o percentual de MDR*"} name={"mdr"} />
            <InputComponent error={errors.days?.message} register={register} label={"Dias a serem calculadas as antecipações"} name={"days"} />
            <button type='submit'>
              {isLoading ? (<img src={load} alt="loading" />) : (<>Simular</>)}
            </button>
          </form>
        </div>
        <div className="container--rigth">
          <h2>VOCÊ RECEBERÁ</h2>
          {!isDaysOn ? (
            <>
              <RewardCard response={isResponseOn} date={"Amanhã:"} value={responseObject && Object.values(responseObject)[0]} />
              <RewardCard response={isResponseOn} date={"Em 15 dias:"} value={responseObject && Object.values(responseObject)[1]} />
              <RewardCard response={isResponseOn} date={"Em 30 dias:"} value={responseObject && Object.values(responseObject)[2]} />
              <RewardCard response={isResponseOn} date={"Em 90 dias:"} value={responseObject && Object.values(responseObject)[3]} />
            </>
          ) : (
            responseObject && Object.keys(responseObject).map((item, index) => {
              return <RewardCard key={index} response={isResponseOn} date={`Em ${item} dias`} value={Object.values(responseObject)[index]} />
            })
          )}
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
      />
    </div>
  );
}

export default App;
