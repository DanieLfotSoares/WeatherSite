// Weather App Configuration - Portfolio Version
// Versão simplificada para uso público sem configuração

const weatherConfig = {
    // API Key pública para projeto de portfolio
    getApiKey() {
        return '76c8fb31dab868672ef2ba269406cd41';
    },
    
    // Base URL da OpenWeatherMap API
    getBaseUrl() {
        return 'https://api.openweathermap.org/data/2.5';
    },
    
    // Validação básica da API
    async validateApiKey() {
        try {
            const response = await fetch(
                `${this.getBaseUrl()}/weather?q=Lisboa&appid=${this.getApiKey()}&units=metric&lang=pt`
            );
            if (response.ok) {
                console.log('✅ API Key válida e funcional!');
                return true;
            } else {
                console.warn('⚠️ API Key pode ter problemas');
                return false;
            }
        } catch (error) {
            console.warn('⚠️ Erro ao validar API key:', error);
            return false;
        }
    }
};

// Log de confirmação
console.log('🌤️ Weather Config carregado - Modo Portfolio (Plug & Play)');

// Exportar para uso em outros ficheiros
if (typeof module !== 'undefined' && module.exports) {
    module.exports = weatherConfig;
}
