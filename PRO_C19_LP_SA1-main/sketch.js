var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if (gameState === "play") {

  
  if(tower.y > 400){
      tower.y = 300
    }

  if (keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }

  if (keyDown("right_arrow")) {
    ghost.x = ghost.x +3;
  }

  if (keyDown("space")) {
    ghost.velocityY = -5;
  }

  ghost.velocityY += 0.8;
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0
  }

  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }

    spawnDoor()
  

    drawSprites();
}

if (gameState === "end") {
  stroke("yellow");
  fill("yellow");
  textSize (20);
  text("GAME OVER!!", 230, 230, 250);


}
}

function spawnDoor() {
  if (frameCount % 250 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);

    climber = createSprite(200, 10);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1
    climber.lifetime = 800

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true



    ghost.depth = door.depth;
    ghost.depth = climber.depth;
    ghost.depth += 1;
    

    climbersGroup.add(climber);

    door.lifetime = 800;
    
    doorsGroup.add(door);

  }
}