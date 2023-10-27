import { useState, FormEvent } from 'react';
import './App.css';
import logotipoImg from './assets/logo.png';

interface InfoProps {
  title: string;
  alcool: number | string;
  petrol: number | string;
}


export default function App() {
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [petrolInput, setPetrolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcularCusto(event: FormEvent): void {
    event.preventDefault();
    if (alcoolInput / petrolInput <= 0.7) {
      setInfo({
        title: 'Compensa usar álcool',
        alcool: formatMoney(alcoolInput),
        petrol: formatMoney(petrolInput)
      })
    } else {
      setInfo({
        title: 'Compensa usar gasolina',
        alcool: formatMoney(alcoolInput),
        petrol: formatMoney(petrolInput)
      })
    }
  }

  function formatMoney(value: number) {
    const valueformat = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
    return valueformat;
  }

  return (
    <>
      <main>
        <div className='image-content'>
          <img src={logotipoImg} alt="" className="logo-content" />
        </div>
        <h1 className='title'>Qual a melhor opção?</h1>
        <form className='input-option' onSubmit={calcularCusto}>
          <p className='input-price'>
            <label htmlFor="alcool">Álcool (preço por litro)</label>
            <input type="number" 
              name='alcool'
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={alcoolInput}
              onChange={e => setAlcoolInput(Number(e.target.value))}
            />
          </p>
          <p className='input-price'>
            <label htmlFor="petrol">Gasolina (preço por litro)</label>
            <input type="number" 
              name='petrol'
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={petrolInput}
              onChange={e => setPetrolInput(Number(e.target.value))}
              />
          </p>
          <input type="submit" 
            className='calcular-button' 
            value='Calcular'
            />
        </form>
        {info && Object.keys(info).length > 0 && (
          <section className='resultado'>
            <h2 className='resultado-title'>{info.title}</h2>
            <p>Álcool {info.alcool}</p>
            <p>Gasolina {info.petrol}</p>
          </section>
        )}
      </main>
    </>
  )
}

