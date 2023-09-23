const stream = require("stream")

const fs = require("fs")


const baseUrl = "https://storage.cryptoavatars.io/assets/1/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03/{nounId}/default_{nounId}.vrm"

// write a script that downloads the first 50 nouns from the cryptoavatars api
// should save to ./nouns/vrm folder
function downloadNouns() {
  for (let i = 0; i < 50; i++) {
    const url = baseUrl.replace(/{nounId}/g, i.toString())
    // fetch vrm from url and save locally
    fetch(url).then((res) => {
      const dest = fs.createWriteStream(`./nouns/vrm/${i}.vrm`)
      
      // @ts-ignore
      const body = stream.Readable.fromWeb(res.body)
      body.pipe(dest)


    })
  }
}

downloadNouns()

