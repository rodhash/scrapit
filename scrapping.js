#!/usr/bin/env node

const pup = require('puppeteer')
const fs  = require('fs')

const allResults    = []
const resSena       = []
const resQuina      = []
const resLotoFacil  = []
const resLotoMania  = []
const resSuperSete  = []
const resDuplaSena  = []
const resLoteca     = []
const resDiaDeSorte = []
const resTimeMania  = []
const urlQuina      = "https://loterias.caixa.gov.br/Paginas/Quina.aspx"
const urlSena       = "https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx"
const urlLotoFacil  = "https://loterias.caixa.gov.br/Paginas/Lotofacil.aspx"
const urlLotoMania  = "https://loterias.caixa.gov.br/Paginas/Lotomania.aspx"
const urlSuperSete  = "https://loterias.caixa.gov.br/Paginas/Super-Sete.aspx"
const urlDuplaSena  = "https://loterias.caixa.gov.br/Paginas/Dupla-Sena.aspx"
const urlLoteca     = "https://loterias.caixa.gov.br/Paginas/Loteca.aspx"
const urlDiaDeSorte = "https://loterias.caixa.gov.br/Paginas/Dia-de-Sorte.aspx"
const urlTimeMania  = "https://loterias.caixa.gov.br/Paginas/Timemania.aspx"

async function getSena() {
    const browser = await pup.launch()
    const page    = await browser.newPage()

    let scanSena = true
    let result
    let n = 1

    while (scanSena){
        try {
            await page.goto(urlSena)

            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
            })
            if (result){
                scanSena = false
                // console.log(`Sena finished successfully after ${n} scan(s)`)
                console.log('MegaSena:', result)
                await browser.close()
            } else{
                n=n+1
            }

        } catch(err){
            console.log('Error found', err)
            console.log('trying again..')
        }
    }
    return result
}

async function getQuina() {
    const browser  = await pup.launch()
    const page     = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlQuina)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
            })
            if (result) {
                runScan = false
                console.log('Quina: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }

        } catch(e) {
        }
    }
    return result
}

async function getLotoFacil() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlLotoFacil)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > div:nth-child(3)')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
            })
            if (result) {
                runScan = false
                console.log('LotoFacil: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e){}
    }
    return result

}

async function getLotoMania() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlLotoMania)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > div:nth-child(3)')).map(x => x.textContent)[0].trim().match(/.{1,2}/g).map(x => x.trim()).filter(x => x !== '')
            })
            if (result) {
                runScan = false
                console.log('LotoMania: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e) {}
    }
    return result

}

async function getSuperSete() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlSuperSete)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g).map(x => x.trim()).filter(x => x !== '').join('').match(/.{1,2}/g).map(x => x[1])
            })
            // console.log(`result ${n}: `, result)
            if (result) {
                runScan = false
                console.log('SuperSete: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e) {}
    }
    return result
}

async function getDuplaSena1() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlDuplaSena)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > ul:nth-child(3)')).map(x => x.textContent)[0].replace('1º sorteio', '').trim().match(/.{1,2}/g)
            })

            if (result) {
                runScan = false
                console.log('Dupla Sena1: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e) {}
    }
    return result
}

async function getDuplaSena2() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlDuplaSena)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > ul:nth-child(4)')).map(x => x.textContent)[0].replace('2º sorteio', '').trim().match(/.{1,2}/g)
            })

            if (result) {
                runScan = false
                console.log('Dupla Sena2: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e) {}
    }
    return result
}



async function getLoteca() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlLoteca)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > table > tbody')).map(x => x.textContent)
            })
            if (result) {
                runScan = false
                // console.log('Loteca: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e) {}
    }
    return result
}

async function getDiaDeSorte() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlDiaDeSorte)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
            })
            if (result) {
                runScan = false
                console.log('Dia de Sorte: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e) {}
    }
    return result
}

async function getTimeMania() {
    const browser = await pup.launch()
    const page = await browser.newPage()

    let runScan = true
    let result
    let n = 1

    while (runScan) {
        try {
            await page.goto(urlTimeMania)
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
            })

            if (result) {
                runScan = false
                console.log('Time Mania: ', result)
                await browser.close()
            }
            else {
                n = n+1
            }
        } catch(e){}
    }
    return result
}


// --------------------------------------------------


const today = new Date(Date.now()).toLocaleString("pt-BR", {weekday: "long", month: "long", day: "numeric", year: "numeric"})
console.log(today)


// getSena()
// getQuina()
// getLotoFacil()
// getLotoMania()
// getSuperSete()
// getDuplaSena1()
// getDuplaSena2()
// getDiaDeSorte()
// getTimeMania()

// getLoteca()
//     .then(result => {
//         console.log('Loteca ...')
//         const data = result[0].split('\n')
//         const results = []
//
//         data.splice(0, 9) // clean up header
//         while (data.length > 0) {
//             results.push(
//                 {
//                     game: data.splice(0, 15)
//                 }
//             )
//         }
//
//         results.forEach(el => {
//             const golTimeA = String(el.game[1]).trim()
//             const timeA = String(el.game[4]).trim()
//             const timeB = String(el.game[9]).trim()
//             const golTimeB = String(el.game[11]).trim()
//
//             if (timeA !== "undefined" ){
//                 console.log(timeA, golTimeA, ' x ', golTimeB, timeB)
//                 console.log('---------------------------- ')
//             }
//         })
//     },
//     rej => {
//         console.log('REJ: something went wrong')
//         console.log(rej)
//     })


const runAll = async () => {
    await getSena()
    await getQuina()
    await getLotoFacil()
    await getLotoMania()
    await getSuperSete()
    await getDuplaSena1()
    await getDuplaSena2()
    await getDiaDeSorte()
    await getTimeMania()

    const lotecaArray = []
    let resLoteca = await getLoteca()
    resLoteca = resLoteca[0].split('\n')
    resLoteca.splice(0, 9)
    while (resLoteca.length > 0) {
        lotecaArray.push(
            {
                game: resLoteca.splice(0, 15)
            }
        )
    }
    lotecaArray.forEach(el => {
        const golTimeA = String(el.game[1]).trim()
        const timeA = String(el.game[4]).trim()
        const timeB = String(el.game[9]).trim()
        const golTimeB = String(el.game[11]).trim()
        if (timeA !== "undefined" ){
            console.log(timeA, golTimeA, ' x ', golTimeB, timeB)
            console.log('---------------------------- ')
        }
    })
}

runAll()

