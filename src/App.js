import { useState, useEffect} from 'react';
import './App.css';

function Exchange () {

    const [rateData, setRate] = useState();
    const [inputValue, setinputValue] = useState('');
    const [initialCurrency, setInitialCurrency] = useState('USD');
    const [result, setResult] = useState()



    function filterUsdAndEur ( arr ){

      const res = arr.filter(item => {
            const i = item.cc;
            if(i === 'USD' || i === 'EUR' || i === 'HUF'){
                return item
            }
        })
        return res
    }

    function onInputChange(e) {
        setinputValue(e.target.value);

    }

    useEffect(() => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then(res => res.json())
        .then(res=> setRate(filterUsdAndEur(res)))
        .catch(err => console.log(`EOOOOOOOOOOOOOOOOORRR ${err}`));
    }, [])

    useEffect(()=>{
        if (!rateData){
            return
        }

        rateData.forEach(item => {
            if(initialCurrency === item.cc){
                setResult(Math.round(item.rate * inputValue) + ' UAH')
            }
        })

    }, [inputValue, initialCurrency])


    function onBtnClick (e){
        setInitialCurrency(e.target.name);
    }


    return(
        <div className="exchange__wrapper">
            <div className='exchange__header'>Enter your money:</div>
            <input type="number" className='exchange__input'
                   onChange={(e) => {onInputChange(e)}}
                   value = {inputValue}/>
            <div className="exchange__subheader">Select your currency:</div>
            <div className="buttons__wrapper">

                <button name='USD' 
                        className="currency__btn" 
                        style={initialCurrency === 'USD'? {backgroundColor:'green'} : null}
                        onClick = {(e) => onBtnClick(e)}>USD</button>
                <button name='EUR' 
                        className="currency__btn" 
                        style={initialCurrency === 'EUR'? {backgroundColor:'green'} : null}
                        onClick={(e) => onBtnClick(e)}>EUR</button>
                <button name='HUF' 
                        className="currency__btn" 
                        style={initialCurrency === 'HUF'? {backgroundColor:'green'} : null}
                        onClick={(e) => onBtnClick(e)}>HUF</button>

            </div>
            <div className="result">Your result in UAH is</div>
            <div className="result2">{result}</div>
        </div>
    )
}

function App() {
  return (
        <div className="wrapper">
            <Exchange/>
        </div>
  );
}

export default App;
