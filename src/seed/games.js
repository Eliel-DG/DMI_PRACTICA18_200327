const players = [
    {
        PlayerID: generateRandom(1,10),
        title: "starchy9295@outlook.com",
        startAT:  Date.now(),
        endsAt: Date.now() + generateRandom(5000,300000)


    },
    {
    },
    
]

function generateRandom(min = 0, max = 100){
    let diference = max -min;

    let rend = Math.random();

    rend = Math.floor( rand * diference)

    rend = rend + min
}
export default players