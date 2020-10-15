class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  car1 = createSprite(100,200);
  car2 = createSprite(200,200);
  car3 = createSprite(300,200);
  car4 = createSprite(400,200);
  
  array = [car1,car2,car3,car4];

  

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_position = 130;
      for(var plr in allPlayers){
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, displayWidth/3,displayHeight/3-90)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    
    if(index === player.index){
      var index = 0;
      array[index-1].shapeColor = red;
      camera.position.x = displayWidth/2;
      camera.position.y = array[index-1].y;
    }
  }
}
