class Bat {
  
    constructor(batImage) {
      this.batImage = batImage;
      this.y = 100;
      this.x = 200;
      this.speed = 5;
    }
    
    
    create() {
      image(this.batImage, this.x, this.y, 150, 150);  
      //rect(this.x, this.y, 50, 150);
    }
    

    move() {
      this.x = mouseX;
      this.y = mouseY;
    }
    
  }
