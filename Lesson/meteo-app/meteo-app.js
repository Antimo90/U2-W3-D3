// URL https://api.open-meteo.com/v1/forecast?latitude=44.7683&longitude=9.3841&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1

const getBobbioWeather = function () {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=44.7683&longitude=9.3841&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1"
  )
    .then((res) => {
      console.log("RESPONSE", res);
      if (res.ok) {
        // la risposta dal server è ok, estrapoliamo il JSON
        return res.json();
      } else {
        // la Response ha un problema!
        throw new Error("La response da Open Meteo non è ok");
      }
    })
    .then((meteoObj) => {
      console.log(meteoObj);
      console.log(meteoObj.daily.temperature_2m_min[0]);
      console.log(meteoObj.daily.temperature_2m_max[0]);
      //   è solo qui dentro che posso utilizzare meteoObj!
      const minSpan = document.getElementById("min-temp");
      const maxSpan = document.getElementById("max-temp");
      minSpan.innerText = meteoObj.daily.temperature_2m_min[0];
      maxSpan.innerText = meteoObj.daily.temperature_2m_max[0];

      //   metto anche la temp corrente
      const currentTempSpan = document.getElementById("current-temp");
      currentTempSpan.innerText = meteoObj.current.temperature_2m;
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getBobbioWeather();
