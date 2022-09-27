import React from 'react';
import './App.css';
import InputComponent from './Components/Input';
import RewardCard from './Components/RewardCard';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="container--left">
        <h1>Simule sua antecipação</h1>
        <form>
          <InputComponent label={"Informe o valor da venda *"} />
          <InputComponent label={"Em quantas parcelas *"} />
          <InputComponent label={"Informe o percentual de MDR*"} />
        </form>
        </div>
        <div className="container--rigth">
          <h2>VOCÊ RECEBERÁ</h2>
          <RewardCard date={"Amanhã"} />
          <RewardCard date={"Em 15 dias"} />
          <RewardCard date={"Em 30 dias"} />
          <RewardCard date={"Em 90 dias"} />
        </div>
      </div>
    </div>
  );
}

export default App;
