const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add }= require('../math');

test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13);
    // if(total !== 13){
    //     throw new Error('Total tip should be 13.Got ' + total )
    // }
})

test('Should calculate total with a default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5)
})

test('Should convert 32F to 0 C', () => {
     const converted = fahrenheitToCelsius(32);
     expect(converted).toBe(0);
})

test('Should convert 0 C to 32F', ()=> {
    const converted = celsiusToFahrenheit(0);
    expect(converted).toBe(32);
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000)
// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async()=> {
    const sum = await add(10, 22);
    expect(sum).toBe(32)
})


