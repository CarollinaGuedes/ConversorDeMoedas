let dolar = 5.25;

let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");

usdInput.addEventListener("keyup", () => {
    let cursorPosition = usdInput.selectionStart;
    usdInput.value = formatCurrency(usdInput.value);
    usdInput.setSelectionRange(cursorPosition, cursorPosition);
    convert("usd-to-brl");
});

brlInput.addEventListener("keyup", () => {
    let cursorPosition = brlInput.selectionStart;
    brlInput.value = formatCurrency(brlInput.value);
    brlInput.setSelectionRange(cursorPosition, cursorPosition);
    convert("brl-to-usd");
});

usdInput.value = "1000,00";
convert("usd-to-brl");

// Funções

function formatCurrency(value) {
    // Remover qualquer caractere que não seja número ou vírgula
    value = value.replace(/[^0-9,]/g, '');

    // Substituir vírgula por ponto
    value = value.replace(",", ".");

    let floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
        floatValue = 0;
    }

    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(floatValue);
}

function fixValue(value) {
    let fixedValue = value.replace(",", ".");
    let floatValue = parseFloat(fixedValue);
    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    return floatValue;
}

function convert(type) {
    if (type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);

        let result = fixedValue * dolar;
        result = result.toFixed(2);

        brlInput.value = formatCurrency(result.toString().replace(".", ","));
    }

    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);

        let result = fixedValue / dolar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result.toString().replace(".", ","));
    }
}
