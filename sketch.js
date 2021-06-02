//Create variables here
var dog,happyDog,foodS,foodStock,database
var dogImg;
var happydogImg;
function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  happydogImg=loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);

  database= firebase.database();

  dog=createSprite(300,200,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3

  foodStock=database.ref('Food');
  foodStock.on("value", readStock)
  
}


function draw() { 
  
  background(255);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImg)
  }

  drawSprites();

  textSize(30)
  text("Food Remaining : " + foodS,100,40);
  textSize(20)
  text("Press the up arrow key to feed Drago milk", 70,60);
  //add styles here

}

function readStock(data){
  foodS= data.val();
  console.log(foodStock)
}

function writeStock(x){
  if(x<=0 ){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food : x
  })
}


