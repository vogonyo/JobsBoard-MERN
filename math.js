exports.calculateTip = (total, tipPercent = .25) => total + (total*tipPercent);
exports.fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;
exports.celsiusToFahrenheit = (temp) => (temp * 1.8) + 32;
exports.add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('Numbers must not be non-negative')
            }

            resolve(a + b)

        }, 2000)
    })
}

//Goal: Test Temperature conversion functions
   // 1) Export both functions and load them to test suite
   // 2) Create "Should convert 32F to 0 C"
   // 3) Create "Should convert 0 C to 32F"
   // 4) Run the jest to test your work