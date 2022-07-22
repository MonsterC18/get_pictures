
const fs = require('fs')
const request = require('request')
const search = require('./src/search')
const aimUrl = process.argv[2]
const searchAim = process.argv[3]

const getImage = async()=>{
    let imagePath =await search(aimUrl,searchAim)
    console.log(imagePath.length)
    if(imagePath.length == 0){
        imagePath =await search(aimUrl,searchAim)   
     }
    for(let i = 0 ; i < imagePath.length ; i++){
        let imgUrl = imagePath[i]
        let fileName = `${new Date().getTime()}${searchAim}${i}.png`
        fs.mkdir('D:/img',(e)=>{
            if(!e || (e&&e).code === 'EEXIST'){
                if(imgUrl){
                    request(imgUrl).pipe(fs.createWriteStream("D:/img/"+fileName))
                    console.log(`${fileName}-----------100%`)
                }else{
                    console.log('null')
                }
            }else{
                console.log(e)
            }
        })
    
      
    }

}
getImage()


