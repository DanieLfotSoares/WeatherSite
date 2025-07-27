# 🌤️ Weather App - Daniel Soares

Uma aplicação meteorológica moderna e responsiva desenvolvida com HTML, CSS e JavaScript vanilla, utilizando a OpenWeatherMap API para fornecer dados precisos e atualizados sobre as condições climáticas.

## 🌟 **Características Principais**

### ⚡ **Funcionalidades Core**
- 🔍 **Pesquisa por Cidade** - Busca dados meteorológicos de qualquer cidade do mundo
- 📍 **Localização Atual** - Deteta automaticamente a tua localização usando GPS
- 🌡️ **Dados em Tempo Real** - Temperatura, humidade, vento, pressão atmosférica
- 📅 **Previsão 2 Dias** - Previsão detalhada para os próximos dias
- 🕐 **Timezone Correto** - Mostra data/hora local da cidade pesquisada
- 🌈 **Interface Moderna** - Design glass morphism com animações suaves

### 🎨 **Design Features**
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em dispositivos móveis e desktop
- ✨ **Animações CSS** - Gradientes animados e transições fluidas
- 🎭 **Estados Visuais** - Loading, erro e sucesso com feedback visual
- 🌊 **Glass Morphism** - Efeitos de transparência e blur modernos
- 🎯 **UX Intuitiva** - Interface limpa e fácil de usar

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### **APIs & Serviços**
- ![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge)
- ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
- ![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)

### **Funcionalidades Técnicas**
- **Geolocation API** - Para localização atual
- **Fetch API** - Requisições HTTP assíncronas
- **Async/Await** - Programação assíncrona moderna
- **ES6+ Features** - Template literals, destructuring, arrow functions

## 🚀 **Como Executar**

### **📋 Instalação Simples:**
1. **Clone ou download** do repositório
2. **Abra** o `index.html` no seu browser
3. **Pronto!** ✨ A aplicação está funcional

```bash
# Opção 1: Clone
git clone https://github.com/DANIELFOTSOARES/weather-app.git
cd weather-app
open index.html

# Opção 2: Download
# Baixe o ZIP, extraia e abra index.html

# Opção 3: Servidor Local (opcional)
python -m http.server 8000
# ou
npx serve .
```

### **🎯 Sem Configuração Necessária:**
- ✅ **Funciona imediatamente** - Zero setup
- ✅ **API key incluída** - Pronto para uso
- ✅ **Todos os browsers** - Chrome, Firefox, Safari, Edge
- ✅ **Mobile friendly** - Funciona em dispositivos móveis

### **🌐 GitHub Pages Ready:**
Este projeto está otimizado para funcionar perfeitamente no GitHub Pages ou qualquer hosting estático.

## 📋 **Estrutura do Projeto**

```
weather-app/
│
├── 📄 index.html          # Estrutura HTML principal
├── 🎨 styles.css          # Estilos CSS e animações
├── ⚡ script.js           # Lógica JavaScript e API calls
├── ⚙️ config.js           # Configuração da API (plug & play)
├── 🚫 .gitignore          # Ficheiros ignorados pelo Git
└── 📖 README.md           # Documentação do projeto
```

## 🔧 **Funcionalidades Detalhadas**

### **🌡️ Dados Meteorológicos**
- **Temperatura Atual** - Com conversão °C/°F
- **Sensação Térmica** - Como a temperatura realmente se sente
- **Humidade** - Percentagem de humidade do ar
- **Vento** - Velocidade em km/h
- **Pressão Atmosférica** - Em hPa (hectopascais)
- **Visibilidade** - Distância de visibilidade em km
- **Temperaturas Min/Max** - Extremos do dia

### **📅 Sistema de Previsão**
- **Agrupamento Inteligente** - Organiza dados por dia
- **Temperaturas Extremas** - Calcula min/max de cada dia
- **Ícones Representativos** - Usa dados do meio-dia para maior precisão
- **Formatação Localizada** - Datas em português

### **🌍 Geolocalização**
- **Detecção Automática** - Usa GPS do dispositivo
- **Tratamento de Erros** - Mensagens específicas para cada tipo de erro
- **Opções de Precisão** - Configurações otimizadas para melhor accuracy
- **Timeout Handling** - Evita esperas excessivas

## 🎯 **Como Usar**

### **Pesquisa por Cidade**
1. Digite o nome da cidade no campo de pesquisa
2. Clique em "Pesquisar" ou pressione Enter
3. Visualize todos os dados meteorológicos

### **Localização Atual**
1. Clique no botão "📍 Localização Atual"
2. Permita o acesso à localização quando solicitado
3. Os dados da tua localização atual serão exibidos

## 🔍 **Detalhes Técnicos**

### **APIs Utilizadas**
```javascript
// Tempo Atual
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=pt

// Previsão 5 Dias
GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric&lang=pt

// Por Coordenadas (Geolocalização)
GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=pt
```

### **Fluxo de Dados**
```
Utilizador → Input/Geolocalização → Validação → API Call → Processamento → DOM Update → UI Atualizada
```

### **Estados da Aplicação**
- **🔄 Loading** - Enquanto busca dados
- **✅ Sucesso** - Dados exibidos com sucesso
- **❌ Erro** - Mensagens de erro específicas
- **🏠 Inicial** - Estado antes de qualquer pesquisa

## 🎨 **Design System**

### **Cores Principais**
- **Gradiente Principal**: `#667eea → #764ba2 → #f093fb`
- **Gradiente Secundário**: Variações animadas para dinamismo
- **Transparências**: Glass morphism com `rgba(255, 255, 255, 0.1)`

### **Tipografia**
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### **Animações**
- **Background**: Gradientes animados a cada 20s
- **Hover Effects**: Transformações 3D e sombras
- **Loading States**: Spinners e transições suaves

## 📱 **Responsividade**

### **Breakpoints**
- **Desktop**: > 768px
- **Tablet**: 480px - 768px  
- **Mobile**: < 480px

### **Adaptações Mobile**
- Grid layouts adaptativos
- Botões otimizados para toque
- Tipografia escalável
- Espaçamentos reduzidos

## 🚧 **Roadmap Futuro**

### **V2.0 Features** *(Planeadas)*
- 🗺️ **Mapas Interativos** - Visualização em mapa
- 📊 **Gráficos** - Charts de temperatura e humidade
- 🔔 **Notificações** - Alertas meteorológicos
- 🌙 **Modo Escuro** - Tema noturno
- 📱 **PWA** - Instalação como app mobile
- 🌐 **Multi-idioma** - Suporte para mais idiomas

## 🤝 **Contribuições**

Contribuições são bem-vindas! Para contribuir:

1. Faz fork do projeto
2. Cria uma branch para a tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit as tuas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abre um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Vê o ficheiro [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

**Daniel Soares**
- 🌐 Portfolio: [danielfotsoares.github.io/Portfolio](https://danielfotsoares.github.io/Portfolio/)
- 💼 LinkedIn: [Teu LinkedIn]
- 📧 Email: [Teu Email]

## 🙏 **Agradecimentos**

- [OpenWeatherMap](https://openweathermap.org/) - Dados meteorológicos gratuitos
- [Font Awesome](https://fontawesome.com/) - Ícones incríveis
- [Google Fonts](https://fonts.google.com/) - Tipografia Poppins
- Comunidade de desenvolvimento web pela inspiração

---

<div align="center">

**⭐ Se gostas do projeto, deixa uma estrela! ⭐**

Desenvolvido com ❤️ por [Daniel Soares](https://danielfotsoares.github.io/Portfolio/)

</div>
