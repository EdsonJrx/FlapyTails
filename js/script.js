const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

let gravity = 0.2
let n = 1
const sprite = new Image()
sprite.src = './assets/sprite.png'
const chao = [
    {
        sprite,
        sx:0, sy:0,
        sW:300, sH:200,
        dx:0, dy:400,
        dW:300, dH:200,
    },
    {
        sprite,
        sx:0, sy:0,
        sW:300, sH:200,
        dx:300, dy:400,
        dW:300, dH:200,
    },
]

const cano = [
    {
        sprite,
        sx:300, sy:0,
        sW:70, sH:200,
        dx:230, dy:300,
        dW:70, dH:200,
    },
    {
        sprite,
        sx:370, sy:0,
        sW:70, sH:200,
        dx:230, dy:0,
        dW:70, dH:200,
    },
]

const Tails = {
    x : 10,
    y : 10,
    w : 20,
    h : 20,
    vy : 0,
}

function DrawTails(){
    ctx.fillStyle = "rgb(100,0,0)"
    ctx.fillRect(Tails.x, Tails.y ,Tails.w ,Tails.h)
}

function DrawGround(){
    ctx.drawImage(chao[0].sprite, chao[0].sx, chao[0].sy, chao[0].sW, chao[0].sH, chao[0].dx-n%300, chao[0].dy, chao[0].dW, chao[0].dH)
    ctx.drawImage(chao[1].sprite, chao[1].sx, chao[1].sy, chao[1].sW, chao[1].sH, chao[1].dx-n%300, chao[1].dy, chao[1].dW, chao[1].dH)
}

function DrawPipe(){
    ctx.drawImage(cano[0].sprite, cano[0].sx, cano[0].sy, cano[0].sW, cano[0].sH, cano[0].dx-n%370+cano[0].dW, cano[0].dy, cano[0].dW, cano[0].dH)
    ctx.drawImage(cano[1].sprite, cano[1].sx, cano[1].sy, cano[1].sW, cano[1].sH, cano[1].dx-n%370+cano[1].dW, cano[1].dy, cano[1].dW, cano[1].dH)
}

cnv.addEventListener('click', function(e){
    Tails.vy = -5
},false)


function render(){
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    DrawPipe()
    DrawGround(n)
    DrawTails()
}

function update(){
    Tails.vy += gravity
    Tails.y += Tails.vy

    if(Tails.y <= 0){
        Tails.y = 0
        Tails.vy = 0

    } else if((Tails.y + Tails.h) >= chao[0].dy){
        Tails.y = chao[0].dy-Tails.h
        Tails.vy *= -0.5
        n+=0
    } else{n += 2}
    
    if(n%370 ==0){
        console.log(Math.random())
    }
    
}

function loop(){
    window.requestAnimationFrame(loop,cnv)
    update()
    render()
}

loop()