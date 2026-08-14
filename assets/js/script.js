/**
 * Conversor de Monedas Nacional - Script principal
 * Tecnologías: JavaScript ES6+ (fetch, async/await), Chart.js
 * API: mindicador.cl
 */

// Referencias a los elementos del DOM
const clpAmountInput = document.getElementById('clpAmount');
const currencySelect = document.getElementById('currencySelect');
const btnSearch = document.getElementById('btnSearch');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
const errorBox = document.getElementById('errorBox');
const chartSection = document.getElementById('chartSection');
const chartCanvas = document.getElementById('chartCanvas');

// Instancia global para el gráfico de Chart.js
let chartInstance = null;

// Base URL de la API mindicador.cl
const API_BASE_URL = 'https://mindicador.cl/api';

/**
 * Muestra un mensaje de error en el DOM y oculta el gráfico
 * @param {string} message 
 */
function showError(message) {
    errorBox.innerHTML = `
        <div class="alert-error">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    errorBox.classList.remove('d-none');
    resultText.innerHTML = '...';
    chartSection.style.display = 'none';
}

/**
 * Limpia los mensajes de error del DOM
 */
function clearError() {
    errorBox.innerHTML = '';
    errorBox.classList.add('d-none');
}

/**
 * Cambia el estado del botón mientras se realiza la consulta
 * @param {boolean} isLoading 
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        btnSearch.disabled = true;
        btnSearch.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span>Consultando...</span>
        `;
    } else {
        btnSearch.disabled = false;
        btnSearch.innerHTML = `
            <i class="fas fa-search"></i>
            <span>Buscar</span>
        `;
    }
}

/**
 * Formatea un número según el código de la moneda seleccionada
 * @param {number} value 
 * @param {string} currencyCode 
 * @returns {string}
 */
function formatCurrencyResult(value, currencyCode) {
    const symbolMap = {
        dolar: '$',
        euro: '€',
        uf: 'UF ',
        utm: 'UTM ',
        bitcoin: '₿ '
    };

    const symbol = symbolMap[currencyCode] || '$';
    
    // Formato con 2 decimales para divisas comunes, 4 para Bitcoin o UF si es pequeño
    const decimals = currencyCode === 'bitcoin' ? 6 : 2;
    const formattedNumber = value.toLocaleString('es-CL', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

    return `Resultado: ${symbol}${formattedNumber}`;
}

/**
 * Obtiene el valor de cambio actual desde la API usando fetch con try...catch
 * @param {string} currencyCode 
 * @returns {Promise<{valor: number, nombre: string}>}
 */
async function fetchCurrencyData(currencyCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/${currencyCode}`);
        
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor (Código status: ${response.status})`);
        }

        const data = await response.json();
        
        if (!data || !data.serie || data.serie.length === 0) {
            throw new Error('No se encontraron datos disponibles para la moneda seleccionada.');
        }

        // El primer elemento de serie contiene el valor más reciente
        const currentRate = data.serie[0].valor;
        return {
            valor: currentRate,
            nombre: data.nombre,
            serie: data.serie
        };

    } catch (error) {
        console.error('Error al consultar mindicador.cl:', error);
        throw error;
    }
}

/**
 * Genera o actualiza la gráfica de líneas con Chart.js para los últimos 10 días
 * @param {Array} serieData - Arreglo de registros históricos de la API
 * @param {string} currencyName - Nombre descriptivo de la moneda
 */
function renderHistoryChart(serieData, currencyName) {
    // Extraer los últimos 10 días (slice) y revertir para orden cronológico (antiguo -> reciente)
    const last10Days = serieData.slice(0, 10).reverse();

    // Preparar labels (fechas formateadas YYYY-MM-DD) y valores (tipo number)
    const labels = last10Days.map(item => {
        const dateObj = new Date(item.fecha);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    });

    const values = last10Days.map(item => item.valor);

    // Destruir instancia anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Configuración de Chart.js
    const ctx = chartCanvas.getContext('2d');
    
    // Gradiente de fondo para la línea
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(0, 188, 212, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 188, 212, 0.0)');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Historial últimos 10 días (${currencyName})`,
                data: values,
                borderColor: '#00bcd4',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#00bcd4',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#94a3b8',
                        font: {
                            family: 'Poppins',
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e2638',
                    titleColor: '#00bcd4',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Poppins',
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    }
                }
            }
        }
    });

    // Mostrar contenedor del gráfico
    chartSection.style.display = 'block';
}

/**
 * Función principal que maneja la conversión de moneda y actualización de interfaz
 */
async function processConversion() {
    clearError();

    const amountStr = clpAmountInput.value.trim();
    const selectedCurrency = currencySelect.value;

    // Validación 1: Verificar que se ingresó un monto
    if (!amountStr) {
        showError('Por favor, ingrese el monto en CLP que desea convertir.');
        return;
    }

    const amount = Number(amountStr);

    // Validación 2: Verificar que el monto sea un número válido y mayor a cero
    if (isNaN(amount) || amount <= 0) {
        showError('Por favor, ingrese un monto en CLP válido y mayor a 0.');
        return;
    }

    // Validación 3: Verificar selección de moneda
    if (!selectedCurrency) {
        showError('Por favor, seleccione una moneda para realizar la conversión.');
        return;
    }

    // Iniciar llamada asíncrona con try...catch
    setLoadingState(true);

    try {
        const currencyData = await fetchCurrencyData(selectedCurrency);

        // Realizar el cálculo de conversión
        const convertedValue = amount / currencyData.valor;

        // Renderizar resultado en el DOM
        const formattedResultText = formatCurrencyResult(convertedValue, selectedCurrency);
        resultText.innerHTML = formattedResultText;

        // Renderizar el gráfico con los últimos 10 días
        renderHistoryChart(currencyData.serie, currencyData.nombre);

    } catch (error) {
        // Capturar cualquier error ocurrido en fetch o en la respuesta
        const userFriendlyMessage = error.message.includes('Failed to fetch') || error.message.includes('NetworkError')
            ? 'No se pudo conectar con el servicio de mindicador.cl. Verifique su conexión a internet.'
            : error.message;

        showError(userFriendlyMessage);
    } finally {
        setLoadingState(false);
    }
}

// Event Listeners
btnSearch.addEventListener('click', processConversion);

// Permitir ejecutar la conversión al presionar la tecla Enter en el input
clpAmountInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processConversion();
    }
});
