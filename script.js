const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
//Evento de pulo
function handleKeyUp(event){
    if (event.keyCode === 32){
        if (!isJumping){
            jump();
        }
    }
}
function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150){
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() =>{
                if (position <=0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 25);

        }else {
             //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 25);
}

//Criando os cactus
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    cactus.classList.add('cactus');//criando uma classe no html atraves do javaScript.
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    //movimentando o cactus
    let leftInterval = setInterval(() => {
        //verifica se o cactus saiu da tela e destroi ele.
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over!
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
            
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    //gerando cactus aleatorios
    setTimeout(createCactus, randomTime);
}

//Chamando a função createCactus para que o jogo ja inicialize criando os cactus.
createCactus();
document.addEventListener('keyup', handleKeyUp);