// Configuração segura da API usando o sistema de configuração
const API_KEY = weatherConfig.getApiKey();
const BASE_URL = weatherConfig.getBaseUrl();

// Validar API key na inicialização
weatherConfig.validateApiKey().then(isValid => {
    if (!isValid) {
        console.warn('⚠️ Possível problema com a API Key. Verifica a configuração.');
    }
});

// https://api.openweathermap.org/data/2.5/weather?q=CIDADE&appid=CHAVE&units=metric&lang=pt


async function getWeatherByCoords(lat, lon) {
    try {
        console.log(`🌍 Buscando tempo para coordenadas: ${lat}, ${lon}`);
        
        // 1. Obter dados atuais por coordenadas
        const currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`;
        const currentResponse = await fetch(currentUrl);
        const currentData = await currentResponse.json();
        
        if (!currentResponse.ok) {
            throw new Error(currentData.message || 'Erro ao buscar dados do tempo');
        }
        
        // 2. Obter previsão por coordenadas
        const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        if (!forecastResponse.ok) {
            throw new Error(forecastData.message || 'Erro ao buscar previsão');
        }
        
        // 3. Combinar dados atuais + previsão
        return {
            current: currentData,
            forecast: forecastData
        };
        
    } catch (error) {
        console.error('Erro na requisição por coordenadas:', error);
        return null;
    }
}

function getCurrentLocation() {
    // Verificar se o browser suporta geolocalização
    if (!navigator.geolocation) {
        alert('❌ Geolocalização não é suportada pelo seu navegador');
        return;
    }

    // Mostrar loading
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('weatherMain').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    
    console.log('📍 Solicitando localização atual...');

    // Opções para geolocalização
    const options = {
        enableHighAccuracy: true, // Maior precisão
        timeout: 10000,           // 10 segundos de timeout
        maximumAge: 300000        // Cache de 5 minutos
    };

    // Solicitar posição atual
    navigator.geolocation.getCurrentPosition(
        // Sucesso
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            console.log(`✅ Localização obtida: ${lat}, ${lon}`);
            
            // Buscar dados meteorológicos
            const weatherData = await getWeatherByCoords(lat, lon);
            
            if (weatherData) {
                displayWeather(weatherData);
            } else {
                // Mostrar erro
                document.getElementById('loadingState').style.display = 'none';
                document.getElementById('errorState').style.display = 'block';
                document.getElementById('errorMessage').textContent = 'Erro ao obter dados meteorológicos da sua localização.';
            }
        },
        // Erro
        (error) => {
            console.error('❌ Erro de geolocalização:', error);
            
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('errorState').style.display = 'block';
            
            // Mensagens específicas por tipo de erro
            let errorMsg = 'Erro ao obter localização.';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = '❌ Permissão de localização negada. Por favor, permita o acesso à localização.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = '❌ Informações de localização indisponíveis.';
                    break;
                case error.TIMEOUT:
                    errorMsg = '⏰ Timeout: Demorou muito tempo para obter a localização.';
                    break;
            }
            
            document.getElementById('errorMessage').textContent = errorMsg;
        },
        options
    );
}

async function getWeather(cityName) { //assincrona para esperar por respostas, fetch demora tempo, await demora tempo , entao tem de ser assincrona
    
    try { //caso der erro nao crasha
        // 1. Obter dados atuais
        const currentUrl = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt`;
        const currentResponse = await fetch(currentUrl);
        const currentData = await currentResponse.json();
        
        if (!currentResponse.ok) {
            throw new Error(currentData.message || 'Erro ao buscar dados do tempo');
        }
        
        // 2. Obter previsão de 5 dias
        const forecastUrl = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        
        if (!forecastResponse.ok) {
            throw new Error(forecastData.message || 'Erro ao buscar previsão');
        }
        
        // 3. Combinar dados atuais + previsão
        return {
            current: currentData,
            forecast: forecastData
        };
        
    }catch (error) {
        console.error('Erro na requisição:', error);
        return null;
    }
}

function displayWeather(weatherData) { // recebe os dados que a API mandou
    const data = weatherData.current; // Dados atuais
    const forecast = weatherData.forecast; // Previsão
    
    const temperature = data.main.temp;     
    const description = data.weather[0].description; 
    const cityName = data.name;
    const country = data.sys.country; // País (ex: "PT", "ES", "FR")
    const timezone = data.timezone; // Offset em segundos (ex: 3600 para GMT+1)
    const feelsLike = data.main.feels_like; // Sensação térmica
    const weatherIcon = data.weather[0].icon; // Código do ícone (ex: "01d", "02n")
    
    // Calcular hora local da cidade (não do nosso computador!)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // UTC
    const cityTime = new Date(utc + (timezone * 1000)); // Hora da cidade
    
    const options = {
        weekday: 'long',    // Segunda-feira
        year: 'numeric',    // 2025
        month: 'long',      // Janeiro
        day: 'numeric',     // 27
        hour: '2-digit',    // 14
        minute: '2-digit'   // 30
    };
    const cityDateTime = cityTime.toLocaleDateString('pt-PT', options);

    // Mostrar a secção do tempo e esconder loading/erro
    document.getElementById('weatherMain').style.display = 'block';
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';

    // Atualizar os dados no HTML
    document.getElementById('mainTemp').textContent = `${Math.round(temperature)}°`;
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('countryName').textContent = country;
    document.getElementById('currentTime').textContent = cityDateTime;
    document.getElementById('weatherDesc').textContent = description;
    document.getElementById('feelsLike').textContent = `${Math.round(feelsLike)}°`;
    
    // Atualizar ícone do tempo
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherIcon').alt = description;
    
    // Atualizar detalhes meteorológicos
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // m/s para km/h
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('tempMax').textContent = `${Math.round(data.main.temp_max)}°`;
    document.getElementById('tempMin').textContent = `${Math.round(data.main.temp_min)}°`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`; // metros para km
    
    // Mostrar previsão e detalhes
    document.getElementById('forecastSection').style.display = 'block';
    document.getElementById('weatherDetails').style.display = 'block';
    
    // Gerar previsão para os próximos 2 dias
    displayForecast(forecast);
    
    console.log('✅ Dados atualizados na página!', data);
    console.log('🕐 Timezone da cidade:', timezone, 'segundos');
    console.log('🌡️ Sensação térmica:', feelsLike, '°C');
    console.log('🌤️ Ícone do tempo:', weatherIcon);
    console.log('📅 Previsão:', forecast);
}

function displayForecast(forecastData) {
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = ''; // Limpar previsões anteriores
    
    // Agrupar previsões por dia
    const dailyForecasts = {};
    
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000); // Converter timestamp para Date
        const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
        
        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = [];
        }
        dailyForecasts[dateKey].push(item);
    });
    
    // Obter próximos 2 dias (excluindo hoje)
    const today = new Date().toISOString().split('T')[0];
    const futureDays = Object.keys(dailyForecasts)
        .filter(date => date > today)
        .slice(0, 2);
    
    futureDays.forEach((dateKey, index) => {
        const dayData = dailyForecasts[dateKey];
        
        // Calcular temperatura máxima e mínima do dia
        const temps = dayData.map(item => item.main.temp);
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        
        // Usar dados do meio-dia (ou o mais próximo)
        const middayData = dayData.find(item => {
            const hour = new Date(item.dt * 1000).getHours();
            return hour >= 12 && hour <= 15;
        }) || dayData[Math.floor(dayData.length / 2)];
        
        // Criar elemento da previsão
        const forecastItem = document.createElement('div');
        forecastItem.className = 'previsao-item';
        
        const date = new Date(dateKey);
        const dayName = index === 0 ? 'Amanhã' : 'Depois de Amanhã';
        const dateString = date.toLocaleDateString('pt-PT', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
        });
        
        forecastItem.innerHTML = `
            <div class="forecast-date">
                <p class="data">${dayName}</p>
                <p class="day-name">${dateString}</p>
            </div>
            <div class="forecast-weather">
                <img class="icone-previsao" 
                     src="https://openweathermap.org/img/wn/${middayData.weather[0].icon}@2x.png" 
                     alt="${middayData.weather[0].description}">
                <p class="forecast-desc">${middayData.weather[0].description}</p>
            </div>
            <div class="forecast-temps">
                <p class="temperatura-maxima">
                    <i class="fas fa-arrow-up"></i> 
                    <span>${Math.round(maxTemp)}°</span>
                </p>
                <p class="temperatura-minima">
                    <i class="fas fa-arrow-down"></i> 
                    <span>${Math.round(minTemp)}°</span>
                </p>
            </div>
        `;
        
        forecastGrid.appendChild(forecastItem);
    });
    
    console.log('📅 Previsão para próximos 2 dias gerada!');
}

async function searchWeather() {
    // 1. Obter cidade do input
    const cityInput = document.getElementById('CidadeInput');
    const city = cityInput.value.trim(); //remover os espaços em branco no início e no fim
    
    if (!city) {
        alert('Por favor, digite uma cidade!');
        return;
    }

    // Mostrar loading
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('weatherMain').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    
    // 2. Chamar a API
    const weatherData = await getWeather(city);
    
    // 3. Mostrar os dados ou erro
    if (weatherData) {
        displayWeather(weatherData);
    } else {
        // Mostrar erro
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('errorState').style.display = 'block';
        document.getElementById('weatherMain').style.display = 'none';
    }
}

document.getElementById('searchCidade').addEventListener('click', searchWeather);
document.getElementById('searchAtual').addEventListener('click', getCurrentLocation);
document.getElementById('CidadeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});