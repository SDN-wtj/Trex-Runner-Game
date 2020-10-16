var trex, treximg, ground, groundimg, invisiGround, cloudsGroup, cloudimg, cactiGroup, c1, c2, c3, c4, c5, c6, score, deadtrex, restart, restartimg, gameOver, gameOverimg
var PLAY = 1,
  END = 0,
  gamestate = PLAY

function preload() {
  treximg = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png")
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  deadtrex = loadImage("trex_collided.png");
  restartimg=loadImage("restart.png");
  gameOverimg=loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 130, 20, 20);
  trex.addAnimation("running trex", treximg);
  trex.addImage("dead trex", deadtrex)
  trex.scale = 0.3;
  ground = createSprite(300, 140, 600, 20);
  ground.addImage("Ground", groundimg)
  invisiGround = createSprite(300, 150, 600, 20);
  cloudGroup = new Group();
  cactiGroup = new Group();
  score = 0;
  restart= createSprite(300,100);
  gameOver= createSprite(300,150);
  restart.addImage("restart",restartimg)
  gameOver.addImage("gameOver",gameOverimg)
  restart.scale=0.5;
}

function draw() {
  background(0);
  drawSprites();
  if (gamestate == PLAY) {
    //console.log(trex.y);
    ground.velocityX = -6;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 116.5) {
      trex.velocityY = -15
    }
    trex.velocityY = trex.velocityY + 1;
    if (trex.isTouching(cactiGroup)) {
      gamestate = END
    }
    invisiGround.visible = false;
    spawnClouds();
    spawnCacti();
    score = score + 1;
    restart.visible=false;
    gameOver.visible=false;
  } else if (gamestate == END) {
    trex.velocityY = 0;
    ground.velocityX = 0;
    cactiGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("dead trex", deadtrex)
    cactiGroup.setLifetimeEach(-5);
    cloudGroup.setLifetimeEach(-3);
    restart.visible=true;
    gameOver.visible=true;
  if(mousePressedOver(restart)){reset();}
  }
  text("score:" + score, 500, 70)
  trex.collide(invisiGround);
  }

function spawnClouds() {
  if (frameCount % 100 == 0) {
    var cloud = createSprite(600, random(70, 100), 10, 10)
    cloud.addImage("cloud", cloudimg)
    cloud.velocityX = -3;
    cloud.scale = 0.5;
    trex.depth = cloud.depth + 1;
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
  }


}


function spawnCacti() {
  if (frameCount % 110 == 0) {
    var cacti = createSprite(600, 125, 10, 10)
    cacti.velocityX = -6;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        cacti.addImage("1st c", c1)
        break;
      case 2:
        cacti.addImage("2st c", c2)
        break;
      case 3:
        cacti.addImage("3st c", c3)
        break;
      case 4:
        cacti.addImage("4st c", c4)
        break;
      case 5:
        cacti.addImage("5st c", c5)
        break;
      case 6:
        cacti.addImage("6st c", c6)
        break;
      default:
        break;
    }
    cacti.scale = 0.4;
    cacti.lifetime = 100;
    cactiGroup.add(cacti);
  }
}
function reset(){
  gamestate=PLAY
cactiGroup.destroyEach();
cloudGroup.destroyEach();
trex.changeAnimation("running trex",treximg);
score=0;
}