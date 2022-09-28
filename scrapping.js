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
                n++
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
    await page.goto(urlQuina)
    const result   = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
    })
    await browser.close()
    return result
}

async function getLotoFacil() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlLotoFacil)
    const result = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > div:nth-child(3)')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
    })
    await browser.close()
    return result
}

async function getLotoMania() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlLotoMania)
    const result = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > div:nth-child(3)')).map(x => x.textContent)[0].trim().match(/.{1,2}/g).map(x => x.trim()).filter(x => x !== '')
    })
    await browser.close()
    return result
}

async function getSuperSete() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlSuperSete)
    const result = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g).map(x => x.trim()).filter(x => x !== '').join('').match(/.{1,2}/g).map(x => x[1])
    })
    await browser.close()
    return result
}

async function getDuplaSena() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlDuplaSena)
    const result = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > ul:nth-child(3)')).map(x => x.textContent)[0].replace('1º sorteio', '').trim().match(/.{1,2}/g)
    })
    await browser.close()
    return result
}

async function getLoteca() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlLoteca)
    const result = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > table > tbody')).map(x => x.textContent)
    })
    await browser.close()
    // console.log(result)

    return result
}

async function getDiaDeSorte() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlDiaDeSorte)
    const result = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
    })
    await browser.close()
    return result
}

async function getTimeMania() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto(urlTimeMania)

    let scanStatus = true
    let scanNumber = 1
    while (scanStatus) {
        try {
            const result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#ulDezenas')).map(x => x.textContent)[0].trim().match(/.{1,2}/g)
            })
            if (Array.isArray(result) && result.length > 0) {
                scanStatus = false
                console.log('Sena finished successfully')
            } else {
                throw new Error('Sena failed')
            }
        } catch(e){
            scanNumber++
            console.log(`Error on Sena, trying again scan N#${scanNumber}..`)
        }
    }
    await browser.close()
    return result
}

// getSena()
    // .then(megaSena => {
    //     console.log(typeof megaSena)
    //     console.log(megaSena)
    //
    //     resSena.push(...megaSena)
    //     allResults.push({MegaSena: resSena})
    //
    //     console.log(`Mega Sena: ${resSena}`)
    //     console.log('All Results:', allResults)
    //
    //     fs.writeFile('/tmp/loterias.out', JSON.stringify({ allRes: allResults }), err => {
    //         console.log(err)
    //     })
    // })

getSena()

/* getQuina()
    .then(quina => {
        resQuina.push(...quina)
        console.log(`Quina: ${resQuina}`)
    }) */

/* getLotoFacil()
    .then(res => {
        resLotoFacil.push(...res)
        console.log(`Loto Facil: ${resLotoFacil}`)
    }) */

/* getLotoMania()
    .then(res => {
        resLotoMania.push(...res)
        console.log(resLotoMania)
    }) */

/* getSuperSete()
    .then(res => {
        resSuperSete.push(...res)
        console.log(resSuperSete)
    }) */

/* getDuplaSena()
    .then(res => {
        resDuplaSena.push(...res)
        console.log(resDuplaSena)
    }) */

// getLoteca()
//     .then(result => {
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
//     })

/* getDiaDeSorte()
    .then(res => {
        resDiaDeSorte.push(...res)
        console.log(resDiaDeSorte)
    }) */

// getTimeMania()
//     .then(res => {
//         resTimeMania.push(...res)
//         console.log(resTimeMania)
//     })

