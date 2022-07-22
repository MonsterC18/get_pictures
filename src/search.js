const puppeteer = require('puppeteer')
// const aimNum = parseInt(process.argv[4])
const search = async (aimUrl,searchAim)=>{
    const brower = await puppeteer.launch()
    const page = await brower.newPage()
    await page.goto(aimUrl)
    await page.evaluate(()=>{
        const aim = document.querySelectorAll('a')
        aim.forEach(item=>{
            if(item.innerHTML == '图片'){
                item.click()
            }
        })
    })
    await page.waitForNavigation()
    await page.type('#kw',searchAim)
    await page.keyboard.press('Enter')
    await page.setViewport({
        width:1920,
        height:1080
    })
    await page.waitForNavigation()
    await page.evaluate(()=>{
        window.scrollTo(0,3000)
        setTimeout(()=>{
            setTimeout(()=>{window.scrollTo(0,2000)},1000)
        })
    })

    const result = await page.evaluate(()=>{
        let arr = []; //这个箭头函数内部写处理的逻辑  
        const imgs = document.querySelectorAll('.main_img');
        for(let i = 0 ; i < imgs.length ; i++){
          
            if(!imgs[i].src.includes('base64')){
                arr.push(imgs[i].src)
            }
        }
    
        return arr 
    })
    console.log(result)
    //await sleep(30000)

    page.close()
    return result
}




module.exports = search