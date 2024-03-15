let res = {}
for (let i = 0; i<10000; i++){
    const rnd = Math.floor(Math.random()*20) + 1
    if (! res.hasOwnProperty(rnd)) {res[rnd] = 0}
    res[rnd] ++
//    console.log(rnd)
}

console.log(res);