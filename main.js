const apikey = '1Ily54RdHfK1wKYEyzAxAKKmkbWh9UrP'
let locUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=`
let currCondUrl = 'https://dataservice.accuweather.com/currentconditions/v1/'

const process = () => {
  const city = document.getElementById('city').value
  if (city.trim()) {
    localStorage.setItem('city', city)
    beforeFetch()
    getWeather(city)
  }
}

document.getElementById('submit').addEventListener('click', process)

const getWeather = (city) => {
  fetch(locUrl + city)
    .then((response) => response.json())
    .then((data) => getCurrCond(data[0].Key, data[0].EnglishName))
}

const getCurrCond = (loc, name) => {
  fetch(currCondUrl + loc + `?apikey=${apikey}`)
    .then((response) => response.json())
    .then((data) => {
      afterFetch()
      fillData(data, name)
    })
}

const beforeFetch = () => {
  document.getElementById('city').setAttribute('disabled', true)
  document.getElementById('submit').setAttribute('disabled', true)
  document.getElementById('data').style.display = 'none'
  document.getElementById('load').style.display = 'block'
}

const afterFetch = () => {
  document.getElementById('city').removeAttribute('disabled')
  document.getElementById('submit').removeAttribute('disabled')
  document.getElementById('data').style.display = 'block'
  document.getElementById('load').style.display = 'none'
}

const fillData = (data, name) => {
  document.getElementById('heading').textContent = name
  document.getElementById('temp').textContent = data[0].Temperature.Metric.Value
  document.getElementById('cond').textContent = data[0].WeatherText
  document.getElementById('observe').textContent =
    data[0].LocalObservationDateTime
  if (data[0].IsDayTime) {
    document.getElementById('day').style.display = 'inline'
    document.getElementById('night').style.display = 'none'
  } else {
    document.getElementById('day').style.display = 'none'
    document.getElementById('night').style.display = 'inline'
  }
  img = document.createElement('img')
  icon = data[0].WeatherIcon
  icon = icon < 10 ? '0' + icon : `${icon}`
  img.src = `./img/${icon}-s.png`
  document.getElementById('icon').innerHTML = ''
  document.getElementById('icon').appendChild(img)
}

const city = localStorage.getItem('city')

if (city) {
  beforeFetch()
  getWeather(city)
}
