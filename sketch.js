//Programa: Jogo para pegar tesouros. Evite as Espadas
// aluno:Matheus Henrique de Lisboa Ferreira
//data: 07/03/2022

// declaração de variáveis
var path,boy,cash,diamonds,jewelry,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;
var qDinheiro = 0, qDiamante = 0, qColar = 0;

//Estados do Jogo
var PLAY=1;
var END=0;
var gameState=1;

// Configuração inicial
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("fimdeJogo.png");
}

// Configuração do jogo
function setup(){
  
  createCanvas(400,600);
  // Movendo fundo
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //criando menino correndo
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.08;
  
  // criação dos grupos
  cashG = new Group();
  diamondsG = new Group();
  jewelryG = new Group();
  swordGroup = new Group();

}// fim do setup

// Função Principal
function draw() {

  // se o jogo está ativo
  if(gameState === PLAY){
    background(0);
    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
    //código para reiniciar o fundo
    if(path.y > 400 ){
      path.y = height/2;
    }
    
    // criação dos sprites
    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    // se o boy tocar no dinheiro
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      qDinheiro++;
    } else if (diamondsG.isTouching(boy)) { // tocar no diamente
        diamondsG.destroyEach();
        treasureCollection=treasureCollection+100;
        qDiamante++;
      } else if(jewelryG.isTouching(boy)) { // tocar no colar
        jewelryG.destroyEach();
        treasureCollection += 150;
        qColar++;
        // treasureCollection= 150;
        // treasureCollection= treasureCollection - 150;
        // treasureCollection= treasureCollection + 150;
      
      } else { // se não tocar em nenhum dos tres
        if(swordGroup.isTouching(boy)) { // tocar na espada
          gameState=END;
          // boy.addAnimation(endImg);
          boy.addAnimation("SahilRunning",endImg);
          // boy.addAnimation("SahilRunning");
          // boy.addAnimation(SahilRunning,endImg);

          boy.x=200;
          boy.y=300;
          boy.scale=0.6;
        
          //cashG.destroyEach;
          //diamondsG.destroyEach;
          //jewelryG.destroyEach;
          // swordGroup.destroyEach;

          // cashG.destroy();
          // diamondsG.destroy();
          //jewelryG.destroy();
          // swordGroup.destroy();
          
          // destroi os sprites
          cashG.destroyEach();
          diamondsG.destroyEach();
          jewelryG.destroyEach();
          swordGroup.destroyEach();
        
          // cashGdestroyEach();
          // diamondsGdestroyEach();
          // jewelryGdestroyEach();
          // swordGroupdestroyEach();
        
          cashG.setVelocityYEach(0);
          diamondsG.setVelocityYEach(0);
          jewelryG.setVelocityYEach(0);
          swordGroup.setVelocityYEach(0);
     
        } // fim do se tocar na espada
      } // fim do se não tocar nos tres
  
    drawSprites();
    textSize(20);
    fill(255);
    // desenha score
    text("SCORE: "+ treasureCollection,10,20);
    text("(050) Dinheiro: "+ qDinheiro,10,60);
    text("(100) Diamante: "+ qDiamante,10,80);
    text("(150) Colar: "+ qColar,10,100);
    text("(XXX) Espada (evite)",10,120);
  } // fim do if do jogo ativo

} // fim do draw

// cria o sprite de dinheiro
function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

// cria o sprite de diamante
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

// cria o sprite de colar
function createjewelry() {
  if (World.frameCount % 410 == 0) {
    var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale=0.13;
    jewelry.velocityY = 3;
    jewelry.lifetime = 150;
    jewelryG.add(jewelry);
  }
}

// cria o sprite de espada
function createSword(){
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}
