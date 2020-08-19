import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [confirmed, setConfirmed] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Worldwide");

  const [date, setDate] = useState("");

  const getDate = () => {
    let date = new Date().toLocaleDateString();

    setDate(date);
  };

  useEffect(() => {
    axios
      .get("https://covid19.mathdro.id/api")
      .then((res) => {
        setConfirmed(res.data.confirmed.value);
        setRecovered(res.data.recovered.value);
        setDeaths(res.data.deaths.value);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("https://covid19.mathdro.id/api/countries").then((res) => {
      setCountries(res.data.countries);
    });
    getDate();
  }, []);

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
    if (e.target.value === "Worldwide") {
      axios.get("https://covid19.mathdro.id/api").then((res) => {
        setConfirmed(res.data.confirmed.value);
        setRecovered(res.data.recovered.value);
        setDeaths(res.data.deaths.value);
      });
    } else {
      axios
        .get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
        .then((res) => {
          setConfirmed(res.data.confirmed.value);
          setRecovered(res.data.recovered.value);
          setDeaths(res.data.deaths.value);
        });
    }
  };

  return (
    <div className="container">
      <h2>Covid-19 Global Tracker</h2>
      <select onChange={handleChange} className="dropdown">
        <option value="Worldwide">Worldwide</option>
        {countries.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <h3 style={{ fontSize: "2em" }}>{selectedCountry}:</h3>
      <div className="box-div">
        <div className="box confirmed">
          <h4>Confirmed Cases: </h4>
          <h3>{confirmed}</h3>
        </div>
        <div className="box recovered">
          <h4>Total Recoveries: </h4>
          <h3>{recovered}</h3>
        </div>
        <div className="box deaths">
          <h4>Total Deaths:</h4>
          <h3>{deaths}</h3>
        </div>
      </div>
      <div className="date">{date}</div>
    </div>
  );
}

export default Dashboard;
