class Ball {
  
    constructor(ballImage, speed, fallSpeed) {
      this.ballImage = ballImage;
      this.speed = speed;
      this.fallSpeed = fallSpeed;

      let random = Math.random() * (150 - 300) + 300;
      this.x = random;

      this.y = 500;
      this.state = "up";
    }


    create() {
        image(this.ballImage, this.x, this.y, 40, 40);
        //circle(this.x, this.y, 40, 40)
    }


    move() {


        if(this.y === 40 && this.state === "up")
            this.state = "down";



        switch(this.state) {

            case "up":
                this.y = this.y - this.speed;
                break;

            case "down":
                this.y = this.y + this.fallSpeed;
                break;

            case "hit":
                this.x = this.x + 10;
                break;

             default:
                 break;
        }

    }


    isOutOffCanvas() {
        return this.y > 700;
    }


    isCollideWithBottle(bottleX, bottleY) {

        if(this.state === "up" || this.state === "down")
            return false;

            let bottleY1 = bottleY;
            let bottleY2 = bottleY + 70;
            let bottleX1 = bottleX;
            let bottleX2 = bottleX + 20;
    
            let ballY1 = this.y;
            let ballY2 = this.y + 40;
            let ballX1 = this.x;
            let ballX2 = this.x + 40;
    
            if(ballY1 <= bottleY2 && ballY1 >= bottleY1) {
                if(ballX1 >= bottleX1 && ballX1 <= bottleX2) {
                    return true;
                }
            }

        return false;
    }


    isHitOutOfCanvas() {
        return this.x > 900;
    }


    isCollideWithBat(batX, batY) {

        if(this.state === "hit")
            return false

        let batY1 = batY;
        let batY2 = batY + 150;
        let batX1 = batX;
        let batX2 = batX + 20;

        let ballY1 = this.y;
        let ballY2 = this.y + 40;
        let ballX1 = this.x;
        let ballX2 = this.x + 40;

        if(ballY1 <= batY2 && ballY1 >= batY1) {
            if(ballX1 >= batX1 && ballX1 <= batX2) {
                return true;
            }
        }

        return false;
    }

    
  }
