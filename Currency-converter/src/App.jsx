import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox';
import useCurrencyInfo from './Hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to , setTo] = useState("bdt")
  const [convertedAmount,setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options =currencyInfo? Object.keys(currencyInfo):[];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };
  

  const convert = ()=>{
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
    style={{backgroundImage: `url(https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=2872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`}}
    > 
      <div className='w-full'>
          <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <h1 className='text-center text-white m-1 p-3 font-bold text-4xl' >CONVERT CURRENCY</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                convert()
            }}>
                  <div className='w-full mb-1'>
                  <InputBox
                    label= "From"
                    amount= {amount}
                    currencyOptions = {options}
                    onCurrencyChange = {(currency )=> setFrom(currency)}
                    onAmountChange = {(amount) => setAmount(amount)}
                    selectedCurrency = {from}
                  />
                  </div>
                  <div className='relative w-full h-0.5'>
                    <button
                    className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                    onClick={swap}
                    >Swap</button>
                  </div>
                  <div className='w-full mb-1'>
                    <InputBox
                    label= "to"
                    amount= {convertedAmount}
                    currencyOptions = {options}
                    onCurrencyChange = { (currency )=> setTo(currency)}
                    selectedCurrency = {to}
                    amountDisabled
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
                  >Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
                  <h1 className='w-full text-center text-white px-4 py-3 rounded-lg'>
                    {amount > 0 && currencyInfo[to] ? 
                    (`${amount} ${from.toUpperCase()} is equal to ${convertedAmount.toFixed(3)} ${to.toUpperCase()}`)
                    : ("Enter an amount to convert.")}
                  </h1>
            </form>

          </div>

      </div>

    </div>
  )
}

export default App
