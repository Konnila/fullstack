
import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({kurssi}) => {
    const sumReducer = (acc, cv) => acc + cv.tehtavia;

    return (
        <div>
            <Otsikko text={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa yhteensa={kurssi.osat.reduce(sumReducer, 0)}/>
        </div>
    );
    
}

const Otsikko = ({text}) => {
    return <h2>{text}</h2>;
}

const Sisalto = ({osat}) => {
    return (
        <div>
            { osat.map(o => <Osa key={o.id} osa={o} />) }
        </div>
    );
}

const Osa = ({ osa }) => {
    return <p>{osa.nimi} {osa.tehtavia}</p>;
}

const Yhteensa = ({yhteensa}) => {
    return <p>yhteensä {yhteensa} tehtävää</p>;
}

export default Kurssi;