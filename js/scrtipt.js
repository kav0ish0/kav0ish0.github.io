const weather = document.querySelector('.weather');
const weatherInputText = weather.querySelector('.weather-input__text');
const weatherInputField = weather.querySelector('.weather-input__town');
const weatherX = weather.querySelector('.weather-input__x');
const weatherY = weather.querySelector('.weather-input__y');
const weatherInputs = weather.querySelectorAll(".weather-input__town");
const weatherBackArrow = weather.querySelector("header i");

weatherInputs.forEach(element => {
    element.addEventListener("keyup", e =>{
        if (e.key == 'Enter' && (( weatherInputField.value != "") || (weatherY.value !="" && weatherX.value !=""))){
            requestApi(weatherInputField.value, weatherX.value, weatherY.value);              
        }
    });
});

function requestApi(city, x, y){
    let apiKey = "2914234c6ebf7f3d7dbe05bae6806469";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    weatherInputText.innerText = "Наблюдаем за погодой...";
    weatherInputText.classList.add('pending');
    if(city != ""){
        fetch(api).then(response => response.json()).then(result => weatherDetails(result));
    }else{
        wetherByGetLocation(x, y, apiKey)
    }
};

function weatherDetails(info){
    weatherInputText.classList.replace('pending', 'error');
    if(info.cod == '404'){
        weatherInputText.innerText = `${weatherInputField.value} - не является городом`;
    }else{
        weatherInputText.classList.remove('pending', 'error');
        weather.classList.add("active");
        showWeather(info)
    }
}

function showWeather(info) {
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, temp} = info.main;
    console.log(info);
    weather.querySelector(".weather-part__img").innerHTML = `<img src="img/${changeImg(id)}.svg" alt="clear">`
    weather.querySelector("#wether-num").innerText = Math.round(temp);
    weather.querySelector("#geo").innerText = `${city}, ${country}`;
    weather.querySelector("#feels-like").innerText = Math.round(feels_like);
    weather.querySelector("#weather-type").innerText = description;

    
}

function changeImg(id) {
    let image = '';
    switch (id) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            image = "storm";
            break;
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            image = "haze";
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 505:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            image = "rain";
            break;
        case 600: 
        case 601: 
        case 602: 
        case 611: 
        case 613: 
        case 615: 
        case 616: 
        case 620: 
        case 621: 
        case 622: 
            image = "snow";
            break;
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            image = "haze";
            break; 
        case 800:
            image = "clear";
            break;
        case 801:
        case 802:
        case 803:
        case 804:
            image = "cloud";
            break;
    }
    return image;
}

function wetherByGetLocation(lat, lon, apiKey) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

weatherBackArrow.addEventListener("click", () =>{
    weather.classList.remove('active');
})
