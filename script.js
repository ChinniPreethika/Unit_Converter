var units = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    area: {
        square_meter: 1,
        square_kilometer: 0.000001,
        square_centimeter: 10000,
        square_millimeter: 1000000,
        square_mile: 0.00000038610,
        square_yard: 1.19599,
        square_foot: 10.7639104,
        square_inch: 15550.0031
    },
    volume: {
        cubic_meter: 1,
        cubic_kilometer: 0.000000001,
        cubic_centimeter: 1000000,
        cubic_millimeter: 1000000000,
        liter: 1000,
        gallon: 264.172,
        quart: 1056.69,
        pint: 2113.38
    },
    mass: {
        kilogram: 1,
        gram: 1000,
        pound: 2.2046226,
        ounce: 35.2739619
    },
    temperature: {
        Celsius: {
            Fahrenheit: function(celsius) { return (celsius * 9/5) + 32; },
            Kelvin: function(celsius) { return celsius + 273.15; }
        },
        Fahrenheit: {
            Celsius: function(fahrenheit) { return (fahrenheit - 32) * 5/9; },
            Kelvin: function(fahrenheit) { return (fahrenheit + 459.67) * 5/9; }
        },
        Kelvin: {
            Celsius: function(kelvin) { return kelvin - 273.15; },
            Fahrenheit: function(kelvin) { return (kelvin * 9/5) - 459.67; }
        }
    },
    time: {
        second: 1,
        minute: 0.0166667,
        hour: 0.000277778,
        day: 0.0000115740
    },
    speed: {
        meter_per_second: 1,
        kilometer_per_hour: 3.6,
        mile_per_hour: 2.236936,
        knot: 0.000539957
    },
    currency: {
        USD: {
            EUR: 0.93,
            GBP: 0.80,
            JPY: 139.94,
            CAD: 1.34
        },
        EUR: {
            USD: 1.07,
            GBP: 0.86,
            JPY: 150.12,
            CAD: 1.44
        },
        GBP: {
            USD: 1.25,
            EUR: 1.16,
            JPY: 174.26,
            CAD: 1.67
        },
        JPY: {
            USD: 0.0071,
            EUR: 0.0067,
            GBP: 0.0057,
            CAD: 0.0096
        },
        CAD: {
            USD: 0.74,
            EUR: 0.70,
            GBP: 0.60,
            JPY: 104.23
        }
    }
};

function populateUnits() {
    var conversionType = document.getElementById("conversionType").value;
    var fromUnitSelect = document.getElementById("fromUnit");
    var toUnitSelect = document.getElementById("toUnit");
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    if (conversionType === '') {
        fromUnitSelect.disabled = true;
        toUnitSelect.disabled = true;
        return;
    }

    var conversionUnits = units[conversionType];

    for (var unit in conversionUnits) {
        var option = document.createElement("option");
        option.value = unit;
        option.text = unit;
        fromUnitSelect.appendChild(option);
        toUnitSelect.appendChild(option.cloneNode(true));
    }

    fromUnitSelect.disabled = false;
    toUnitSelect.disabled = false;
}

function convert() {
    var inputValue = document.getElementById("inputValue").value;
    var conversionType = document.getElementById("conversionType").value;
    var fromUnit = document.getElementById("fromUnit").value;
    var toUnit = document.getElementById("toUnit").value;

    var conversionResult;

    if (fromUnit === '' || toUnit === '' || conversionType === '') {
        document.getElementById("result").innerHTML = '';
        return;
    }

    if (conversionType === 'temperature') {
        var conversionFunction = units[conversionType][fromUnit][toUnit];
        conversionResult = conversionFunction(Number(inputValue));
    } else {
        var fromValue = units[conversionType][fromUnit];
        var toValue = units[conversionType][toUnit];
        conversionResult = (Number(inputValue) * toValue) / fromValue;
    }

    document.getElementById("result").innerHTML = inputValue + " " + fromUnit + " = " + conversionResult + " " + toUnit;
}