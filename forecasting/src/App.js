import "./App.css";
import React, { useState, useEffect } from "react";
import Chart from "./components/Chart";
import { apiService } from "./services";

const initData = {
  co2: [],
  temp: [],
};

function App() {
  const [results, setResults] = useState(initData);
  const [real, setReal] = useState(initData);
  const [input, setInput] = useState(initData);

  useEffect(() => {
    const fetchData = () => {
      apiService.getResults().then((data) => {
        setResults({
          co2: data[0][0].co2[0],
          temp: data[0][1].temp[0],
        });
      });
    }
    fetchData()
    const interval = setInterval(fetchData, 1000 * 60 * 5);
    return () => {
      clearInterval(interval)
    }
  }, [setResults]);

  useEffect(() => {
    const fetchData = () => {
      apiService.getReal().then((data) => {
        setReal({
          co2: data[0][0].co2[0],
          temp: data[0][1].temp[0],
        });
      });
    }
    fetchData()
    const interval = setInterval(fetchData, 1000 * 60 * 5);
    return () => {
      clearInterval(interval)
    }
  }, [setReal]);

  useEffect(() => {
    const fetchData = () => {
      apiService.getInput().then((data) => {
        setInput({
          co2: data[0][0].co2,
          temp: data[0][1].temp,
        });
      });
    }
    fetchData()
    const interval = setInterval(fetchData, 1000 * 60 * 5);
    return () => {
      clearInterval(interval)
    }
  }, [setInput]);

  return (
    <body>
      <header>
        <figure>
          <img src="/logo192.png" alt="brand logo" />
          <figcaption>
            CO2 and Temperature Forecasting
          </figcaption>
        </figure>
      </header>
      <main>
        <Chart
          title="CO2"
          results={results.co2}
          real={real.co2}
          input={input.co2}
          xLabel="CO2 (ppm)"
        />
        <Chart
          title="Temperature"
          results={results.temp}
          real={real.temp}
          input={input.temp}
          xLabel="TEMP (°C)"
        />
      </main>
    </body>
  );
}

export default App;
