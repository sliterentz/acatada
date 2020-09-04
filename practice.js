'use strict';

const fs = require('fs')

//contoh callback
function p1() {
  console.log('proses pertama selesai')
}

function p2(callback) {
  setTimeout(
    function () {
      console.log('proses kedua selesai')
      callback()
    }, 100
  )
}

function p3() {
  console.log('proses ketiga selesai')
}
p1()
//fungsi p3 di jalankan bersama fungsi p2
p2(p3)

//contoh promise untuk membaca file
const bacaFile = options => file => new Promise((resolve, reject) => {
  fs.readFile(file, options, (err, content) => {
    if (err) return reject(err)
    return resolve(content)
  })
})

//contoh promise untuk membuat file
const buatFile = (file, content) => new Promise((resolve, reject) => {
  fs.writeFile(file, content, err => {
    if (err) return reject(err)
    return resolve()
  })
})

//contoh async await
async function gabungfile() {
  const read = bacaFile('utf-8')

  try {
    //contoh penggunaan promise all
    const result = await Promise.all([
      read('rahasia1.txt'),
      read('rahasia2.txt')
    ])
    await buatFile('hasilgabung.txt', result.join(''))
  } catch (err) {
    throw err
  }

  return read('hasilgabung.txt')
}

gabungfile()
console.log('proses gabung file selesai');
