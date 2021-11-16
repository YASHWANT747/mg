var player, playerI;
var bg;
var floor, floorI;
var playerR, playerL;
var alien, alienR;
var alienL;
var shipI;
var msl, mslI;
var go, goI;
var sad, sad1, sad2, sad3;
var sound;
var boom, boomI;
var heart1, heartI , heart2, heart3;
var floor1, floor2, floor2;


function preload(){
    bg = loadImage("images/bg.png");
    floorI = loadImage("images/pagenta.png");
    playerI = loadImage("images/front.png");
    playerR = loadImage("images/right.png");
    playerL = loadImage("images/left.png");
    alienR = loadImage("images/genr.png");
    alienL = loadImage("images/genl.png");
    shipI = loadImage("images/ship.png");
    mslI = loadImage("images/msl.png");
    goI = loadImage("images/over.png");
    sad1 = loadImage("images/e1.png");
    sad2 = loadImage("images/e2.png");
    sad3 = loadImage("images/e3.png");
    boomI = loadAnimation("images/5.png","images/4.png","images/3.png","images/2.png","images/1.png");
    //sound = loadSound("sounds/boom.mp3");
    heartI = loadImage("images/life.png");
}


function setup(){
    createCanvas(1000,600);
    //sound.play();

    floor = createSprite(500,612,1000,2);
    floor.addImage(floorI)
    floor.scale = 2;

    floor1 = createSprite(500,570,1000,2);
    floor2 = createSprite(500,573,1000,2);
    floor3 = createSprite(500,576,1000,2);
    floor1.visible = false;
    floor2.visible = false;
    floor3.visible = false;

    player = createSprite(500,520,50,50);
    player.addImage(playerI)
    player.scale = 0.35;

    go = createSprite(500,300,20,20);
    go.addImage(goI);
    go.visible = false;

    heart1 = createSprite(30,40,20,20);
    heart1.addImage(heartI);
    heart1.scale = 0.1;
    heart2 = createSprite(80,40,20,20);
    heart2.addImage(heartI);
    heart2.scale = 0.1;
    heart3 = createSprite(130,40,20,20);
    heart3.addImage(heartI);
    heart3.scale = 0.1;

    //boom = createSprite(500,300,50,50);
    //boom.addAnimation("Explosion" ,boomI);
    //boom.scale = 0.3;

    enemyGroup = new Group()
    shipGroup = new Group()

}

function draw(){
    background(bg);

    if(keyDown("UP_ARROW")){
        msl = createSprite(player.x , player.y , 20 ,20);
        msl.scale = 0.3;
        msl.velocityY = -20;
        msl.addImage(mslI);
        msl.lifetime = 70;
        //player.x = msl.x;
    }
    if(keyDown("W")){
        msl = createSprite(player.x , player.y , 20 ,20);
        msl.scale = 0.3;
        msl.velocityY = -20;
        msl.addImage(mslI);
        msl.lifetime = 70;
        //player.x = msl.x;
    }
    
    if(enemyGroup.isTouching(floor1)){
        heart3.visible=false;
        enemyGroup.destroyEach();
        floor1.destroy();
    }

    if(shipGroup.isTouching(floor1)){
        heart3.visible=false;
        shipGroup.destroyEach();
        floor1.destroy();
    }

    if(enemyGroup.isTouching(floor2)){
        heart2.visible=false;
        enemyGroup.destroyEach();
        floor2.destroy();
    }

    if(shipGroup.isTouching(floor2)){
        heart2.visible=false;
        shipGroup.destroyEach();
        floor2.destroy();
    }

    if(enemyGroup.isTouching(floor3)){
        heart1.visible=false;
        enemyGroup.destroyEach();
        floor3.destroy();
    }

    if(shipGroup.isTouching(floor3)){
        heart1.visible=false;
        shipGroup.destroyEach();
        floor3.destroy();
    }


    enemy();
    //missile();
    //end();
    spaceship();

    if(enemyGroup.isTouching(msl) || shipGroup.isTouching(msl)){
        boom = createSprite(500,  500 , 50, 50);
        console.log(enemyGroup.x)
        boom.addAnimation("Explosion",boomI);
        boom.scale = 0.3;
        enemyGroup.destroyEach();
        shipGroup.destroyEach();
        //boom.destroy()
        msl.destroy();
    }
    
    if(keyDown("RIGHT_ARROW")){
        player.x = player.x + 5;
        player.addImage(playerR);
        player.scale = 0.43;
       }
       if(keyDown("D")){
        player.x = player.x + 5;
        player.addImage(playerR);
        player.scale = 0.43;
       }
    if(keyDown("LEFT_ARROW")){
        player.x = player.x - 5;
        player.addImage(playerL);
        player.scale = 0.35;
    }
    if(keyDown("A")){
        player.x = player.x - 5;
        player.addImage(playerL);
        player.scale = 0.35;
    }
    if(keyDown("UP_ARROW")){
        player.addImage(playerI);
        player.scale = 0.35;
    }
    if(keyDown("W")){
        player.addImage(playerI);
        player.scale = 0.35;
    }
    if(keyDown("DOWN_ARROW")){
        player.addImage(playerI);
        player.scale = 0.35;
    }
    if(keyDown("S")){
        player.addImage(playerI);
        player.scale = 0.35;
    }

    drawSprites();
    //stroke("gold");
    //fill ("red");
    //textSize(18);
    //text ("DON'T LET ALIENS TOUCH YOU OR THIS",575,590);
    //text ("USE ARROW KEYS TO MOVE, UP ARROW TO SHOOT || DON'T LET ALIENS TOUCH YOU OR THIS",10,590);
}

function enemy(){
    if(frameCount % 120 === 0){
        var alien = createSprite(Math.round(random(100,900)),0,20,20);
        var rand = Math.round(random(1,2));
        switch (rand){
            case 1 : alien.addImage(alienR);
            alien.velocityY = 3; 
            alien.scale = 0.3;
            alien.lifetime = 200;
            break;

            case 2 : alien.addImage(alienL);
            alien.velocityY = 3; 
            alien.scale = 0.1;
            alien.lifetime = 200;
            break;
            default:break;
        }
        //alien.velocityY = 3; 
        enemyGroup.add(alien);
    }
}

function spaceship(){
    if(frameCount % 200 === 0){
        var ship = createSprite(Math.round(random(100,900)),0,20,20);
        ship.addImage(shipI);
        ship.velocityY = 4;
        ship.scale = 0.4;
        ship.lifetime = 200;

        shipGroup.add(ship);
    }
}