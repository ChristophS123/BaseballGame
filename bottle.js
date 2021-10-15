class Bottle {

    constructor(bottleImage, speed) {
        this.bottleImage = bottleImage;
        this.speed = speed;
        this.x = 750;
        
        let random = Math.random() * (150 - 300) + 300;
        this.y = random;

        this.state = "up";
    }


    create() {
        image(this.bottleImage, this.x, this.y, 40, 70);
    }


    move() {

        if(this.y <= 40 && this.state === "up")
            this.state = "down";

        if(this.state === "down" && this.y >= 300)
            this.state = "up";

        switch(this.state) {

            case "up":
                this.y = this.y - this.speed;
                break;

            case "down":
                this.y = this.y + this.speed;
                break;

            case "destroy":
                this.x = this.x + 10;
        }

    }



    destroy() {

        this.state = "destroy";

    }

}
