const place = document.querySelector(".place");
const countrys = document.querySelector(".country");
const image = document.querySelector(".image");
const degrees = document.querySelector(".degrees");
const clima = document.querySelector(".clima");
const infoExtra = document.querySelector('.info-extra')

const btnTypeDegrees = document.querySelector(".type-degrees");
const btnMoreInfo = document.querySelector('.more-info')

let degreesType = false;
let extra = false
let info;

function localWeather(pos) {
  const crd = pos.coords;

  console.log(`Latitud: ${crd.latitude}`);
  console.log(`Longitud: ${crd.longitude}`);
  console.log(`Maso o menos ${crd.accuracy} metros.`);

  fetch(
    `https://weather-proxy.freecodecamp.rocks/api/current?lat=${crd.latitude}&lon=${crd.longitude}`
  )
    .then((res) => res.json())
    .then((data) => {
      info = data;
      showWeather();
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

function showWeather() {
  place.textContent = info.name;
  countrys.textContent = info.sys.country;
  image.src = info.weather[0].icon;
  showTemp();
  clima.textContent = info.weather[0].main;
}

function showTemp() {
  degrees.textContent = temperature()
}

function temperature() {
  let degrees = info.main.temp;
  let fahrenheit = (degrees * 9) / 5 + 35

  if (degreesType) {
    btnTypeDegrees.textContent = 'C°'
    return `${fahrenheit.toFixed(2)} F°`;
  } else {
    btnTypeDegrees.textContent = 'F°'
    return `${degrees} C°`;
  }
}

function showInfoExtra() {
  const html = `
  <p>Weather: ${info.weather[0].description}</p>
  <p>Temp. min: ${info.main.temp_min} C°</p>
  <p>Temp. max: ${info.main.temp_max} C°</p>
  <p>Humidity: ${info.main.humidity} %</p>
  <p>Pressure: ${info.main.pressure}</p>
  <p>Wind: ${info.wind.speed} Km/h</p>
  `

  if (extra) {
    infoExtra.innerHTML = html
    btnMoreInfo.textContent = 'Less Info'
  } else {
    infoExtra.innerHTML = ''
    btnMoreInfo.textContent = 'More Info'
  }
}

btnTypeDegrees.addEventListener("click", () => {
  degreesType = !degreesType;
  showTemp();
});

btnMoreInfo.addEventListener('click', () => {
  extra = !extra
  showInfoExtra()
})


navigator.geolocation.getCurrentPosition(localWeather);