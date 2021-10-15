class Bomb {

    constructor(bombImage, speed, fallSpeed) {
        this.bombImage = bombImage;

        let random = Math.random() * (150 - 300) + 300;
        this.x = random + 200;

        this.y = 1000;
        this.speed = speed;
        this.fallSpeed = fallSpeed;
    }


    create() {
        image(this.bombImage, this.x, this.y, 40, 40);
        //circle(this.x, this.y, 40, 40)
    }



    move() {

        if(this.y <= - 200)
            this.y = 1000;

        switch(this.state) {
            
            case "up":
                this.y = this.y - this.speed;
                break;

            case "down":
                this.y = this.y + this.fallSpeed;
                break;

            case "standing":
                break;

             default:
                 break;
        }

    }


    isCollideWithBat(batX, batY) {

        let batY1 = batY;
        let batY2 = batY + 150;
        let batX1 = batX;
        let batX2 = batX + 20;

        let ballY1 = this.y;
        let ballY2 = this.y + 55;
        let ballX1 = this.x - 10;
        let ballX2 = this.x + 55;

        if(ballY1 <= batY2 && ballY1 >= batY1) {
            if(ballX1 >= batX1 && ballX1 <= batX2) {
                return true;
            }
        }

       // if(ballY2 <= batY2 && ballY2 >= batY1) {
        //    if(ballX2 >= batX1 && ballX2 <= batX2) {
          //      return true;
          //  }
       // }

        return false;
    }
}
