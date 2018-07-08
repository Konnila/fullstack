import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
      }

  return (
    <div>
      <Otsikko text={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat} />
      <Yhteensa yhteensa={kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia} />
    </div>
  )
}

const Otsikko = ({text}) => {
    return <h1>{text}</h1>;
}

const Sisalto = ({osat}) => {
    return (
        <div>
            <p>{osat[0].nimi} {osat[0].tehtavia}</p>
            <p>{osat[1].nimi} {osat[1].tehtavia}</p>
            <p>{osat[2].nimi} {osat[2].tehtavia}</p>
        </div>
    );
}

const Yhteensa = (props) => {
    return <p>yhteensä {props.yhteensa} tehtävää</p>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)