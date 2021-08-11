var backGd,backGdImg;
var compound,compoundImg,compoundG;
var element,elementImg,elementG;
var buble,bubleImg,bubleG;

var coin,playerImg, playerDieImg;

var restart, restartImg;
var gameOver,gameOverImg;

var e1,e2,e3,e4,e5;
var c1,c2,c3,c4,c5;
var b1,b2,b3,b4,b5;
var popSd,dieSd,touchSd;

var r;
var PLAY=1;
var END=0;
var gameState=PLAY;

var score=0;

function preload(){
  backGdImg=loadImage("bkgdV.png");
  compoundImg=loadImage("compoundB.png");
  elementImg=loadImage("elementB.png")
  playerImg=loadAnimation("player3.png","player1.png","player2.png");
  playerDieImg = loadAnimation("playerDie.png","playerDie1.png");
  restartImg=loadImage("restart.png");
  gameOverImg=loadImage("gameOver.png");
  
  e1=loadImage("e1.png");
  e2=loadImage("e2.png");
  e3=loadImage("e3.png");
  e4=loadImage("e4.png");
  e5=loadImage("e5.png");
  
  c1=loadImage("c1.png");
  c2=loadImage("c2.png");
  c3=loadImage("c3.png");
  c4=loadImage("c4.png");
  c5=loadImage("c5.png");
  
  b1=loadImage("b1.png");
  b2=loadImage("b2.png");
  b3=loadImage("b3.png");
  b4=loadImage("b4.png");
  b5=loadImage("b5.png");
  
  popSd=loadSound("bsd2.mp3");
  //runSd=loadSound("jump.mp3");
  touchSd=loadSound("bsd3.wav");
  dieSd=loadSound("bsd1.wav");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backGd=createSprite(width/2,height/2);
  backGd.addImage(backGdImg);
  backGd.scale=1.1;
  backGd.visible=false;
 
  coin=createSprite(width/2,height/3);
  coin.addAnimation("coin",playerImg);
  //player.setCollider("circle",0,0,350);
  coin.scale=0.8;
  coin.x=World.mouseX;
  coin.visible=false;
    
  compoundG=new Group();
  elementG=new Group();
  bubleG=new Group();
  
  element=createSprite(200,300);
  element.addImage(elementImg);
    
  compound=createSprite(width-200,300);
  compound.addImage(compoundImg);
  
  element.visible=true;
  compound.visible=true;
  
  gameOver=createSprite(width/3 -30, height/2,20,20);
  restart=createSprite(width/2,height/4);
  gameOver.scale=0.5;
  restart.scale=0.5;
  gameOver.visible=false;
  restart.visible=false;
    
}

function draw() {

  if(gameState==PLAY){
  
    background("purple");
    textSize(25);
    fill("yellow");
    text("Do you want to choose Elements or Compounds",100,100);
    text("Click any one of the following button to Start",118,150);
    
  coin.debug=true
    
  if(mousePressedOver(element)){
    elementAction();
    textSize(20);
    fill("yellow");
    text("Total Score = "+score,50,50);

  }
  if(mousePressedOver(compound)){
    compoundAction();
    textSize(20);
    fill("yellow");
    text("Total Score = "+score,50,50);
    
   }
  } else if(gameState==END){
    gameOver.visible=true;
    restart.visible=true;
    coin.addAnimation("coin",playerDieImg);
    dieSd.play(); 
    
    elementG.setVelocityYEach(0);
    compoundG.setVelocityYEach(0);
    bubleG.setVelocityYEach(0);
    
    elementG.destroyEach(0);
    compoundG.destroyEach(0);
    bubleG.destroyEach(0);
    
    elementG.setLifetimeEach(-1);
    compoundG.setLifetimeEach(-1);
    bubleG.setLifetimeEach(-1);
    
  } 
  drawSprites();
    
  if(mousePressedOver(restart)){
    reset();
  }
}

function spawnElements(){
  if(frameCount%150==0){
    var elements = createSprite(Math.round(random(50,width-50)),3*height/4,10,10);
    //elements.setCollider('rectangle',0,0,45);
    elements.velocityY=-2;
    var eleRand=Math.round(random(1,5));
    switch(eleRand){
      case 1 :elements.addImage(e1);
        break;
      case 2 :elements.addImage(e2);
        break
      case 3 :elements.addImage(e3);
        break;
      case 4 :elements.addImage(e4);
        break;
      case 5 :elements.addImage(e5);
        break;
        
    }
    elements.scale=0.3;
    elements.lifetime=height;
    elements.depth=coin.depth;
    coin.depth+=1;
    elementG.add(elements);
  }
}

function spawnCompounds(){
  if(frameCount%150==0){
    var compounds = createSprite(Math.round(random(80,width-80)),height,10,10);
    //elements.setCollider('circle',0,0,45);
    compounds.velocityY=-2;
    var compRand=Math.round(random(1,5));
    switch(compRand){
      case 1 :compounds.addImage(c1)
        break;
      case 2 :compounds.addImage(c2)
        break
      case 3 :compounds.addImage(c3)
        break;
      case 4 :compounds.addImage(c4)
        break;
      case 5 :compounds.addImage(c5)
        break;
        
    }
    compounds.scale=0.4;
    compounds.lifetime=height;
    compounds.depth=coin.depth;
    coin.depth+=1;
    compoundG.add(compounds);
  }
}

function spawnBubles(){
  if(frameCount%150==0){
    var bubles = createSprite(Math.round(random(80,width-80)),height,10,10);
    //elements.setCollider('circle',0,0,45);
    bubles.velocityY=-2;
    
    var compRand=Math.round(random(1,5));
    switch(compRand){
      case 1 :bubles.addImage(b1)
        break;
      case 2 :bubles.addImage(b2)
        break
      case 3 :bubles.addImage(b3)
        break;
      case 4 :bubles.addImage(b4)
        break;
      case 5 :bubles.addImage(b5)
        break;
        
    }
    bubles.scale=0.3;
    bubles.lifetime=height;
    bubles.depth=coin.depth;
    coin.depth+=1;
    bubleG.add(bubles);
  }
}

function elementAction(){
    element.visible=false;
    compound.visible=false;
    backGd.visible=true;
    coin.addAnimation("coin",playerImg);
    coin.scale=0.5;
    coin.visible = true;
    coin.x=World.mouseX;
    
    r=Math.round(random(1,3));
    r.debug=true;
    switch(r){
      case 1 : spawnElements();
        break;
      case 2 : spawnCompounds();
        break;
      case 3 : spawnBubles();
        break;
    }/*
  spawnElements();
  spawnCompounds();
  spawnBubles();
        popSd.play();
  */
    if(elementG.isTouching(coin)){
      score+=20;
      touchSd.play();
      //elementG.destroyEach();
    }
    if(compoundG.isTouching(coin)){
      score-=10;
      touchSd.play();
      
    }
    if(bubleG.isTouching(coin)){
      gameState=END;
      
    }
  
}

function compoundAction(){
    element.visible=false;
    compound.visible=false;
    backGd.visible=true;
    coin.visible = true;
    coin.x=World.mouseX;
    
    r=Math.round(random(1,3));
    
    switch(r){
      case 1 : spawnElements();
        
        break;
      case 2 : spawnCompounds();
        
        break;
      case 3 : spawnBubles();
    
        break;
    }
        popSd.play();
  
  if(compoundG.isTouching(coin)){
      score+=20;
      touchSd.play();
      
    }
    if(elementG.isTouching(coin)){
      score-=10;
      touchSd.play();
      
    }
    if(bubleG.isTouching(coin)){
      
      gameState=END;
    }
  
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  
  elementG.destroyEach();
  compoundG.destroyEach();
  bubleG.destroyEach();
  
  coin.addAnimation("coin",playerImg);
  score=0;
}
