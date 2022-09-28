import React from 'react';
import './App.css';
import InputComponent from './Components/Input';
import RewardCard from './Components/RewardCard';
import axios from "axios"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import load from "./assets/load.svg"

interface IResponse {
  amount: number
  installments: number
  mdr: number
  days?: any 
}

function App() {

  const formSchema = yup.object().shape({
    amount: yup.string().required("Campo obrigatório!").matches(/^[1-9]\d{3,}$/, 'Apenas números a partir de 1000'),
    installments: yup.string().required("Campo obrigatório!").matches(/(^0?[1-9]$)|(^1[0-2]$)/, 'Apenas números entre 1 e 12'),
    mdr: yup.string().required("Campo obrigatório!").matches(/^[1-9][0-9]?$|^100$/, 'Apenas números entre 1 e 100'),
    days: yup.string(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IResponse>({resolver: yupResolver(formSchema)});
  const [isResponseOn, setIsResponseOn] = React.useState<boolean>(false)
  const [isDaysOn, setIsDaysOn] = React.useState<boolean>(false)
  const [responseObject, setResponseObject] = React.useState<IResponse>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const formatData = (data: IResponse) => {
    let defaultData = {
      amount: data.amount,
      installments: data.installments,
      mdr: data.mdr
    }

    if(data.days === ""){
      return defaultData
    }
    
    let arrayOfDays = data.days && data.days.split(',')
    data.days = arrayOfDays

    return data
  }

  const handleResponse = (data: any) => {

    let dataKeys = Object.keys(data)    
    let defaultResponseKeys = ['1','15','30','90']

    let arrayComparison = dataKeys.length === defaultResponseKeys.length && dataKeys.every((value, index) => value === defaultResponseKeys[index])

    if (!arrayComparison) {
      setIsDaysOn(true)
    }

    setIsResponseOn(true)
    setResponseObject(data)
    setIsLoading(false)
  }

  const onSubmitFunction = async (data: any) => {
    setIsLoading(true)
    let newData = formatData(data)

    await axios.post('https://frontend-challenge-7bu3nxh76a-uc.a.run.app?', newData)
      .then((response) => handleResponse(response.data))
      .catch((err) => console.log(err))
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
            <InputComponent error={errors.days?.message} register={register} label={"Dias à serem calculados as antecipações"} name={"days"} />
            <button type='submit'>
              {isLoading ? (<img src={load}/>) : (<>Simular</>)}
              </button>
          </form>
        </div>
        <div className="container--rigth">
          <h2>VOCÊ RECEBERÁ</h2>
          {!isDaysOn ? (
            <>
              <RewardCard response={isResponseOn} date={"Amanhã"} value={responseObject && Object.values(responseObject)[0]} />
              <RewardCard response={isResponseOn} date={"Em 15 dias"} value={responseObject && Object.values(responseObject)[1]} />
              <RewardCard response={isResponseOn} date={"Em 30 dias"} value={responseObject && Object.values(responseObject)[2]} />
              <RewardCard response={isResponseOn} date={"Em 90 dias"} value={responseObject && Object.values(responseObject)[3]} />
            </>
          ) : (
            responseObject && Object.keys(responseObject).map((item, index) => {
              return <RewardCard key={index} response={isResponseOn} date={`Em ${item} dias`} value={Object.values(responseObject)[index]} />
            })
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
