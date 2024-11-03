document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    var x = innerWidth/2;
    var y = innerHeight / 2;
    var zzz  = 100;
    var degree = 0;
    var degreeI = 5;
    var keydowns = [];

    var a = -3;
    var b = 10;
    var c = 1000;

    var degreeDash = 90;

    var t = -10;
    var tI = 0.1;

    var click = false;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    function Sin(degree, zzz) { 
        let x = innerWidth / 2 + Math.sin(degree * Math.PI/ 180) * zzz;
        let x_1 = innerWidth / 2 + Math.sin((degree - degreeI) * Math.PI/ 180) * zzz
        return x - x_1;
    };
    function Cos(degree, zzz) { 
        let y = innerWidth / 2 + Math.cos(degree * Math.PI/ 180) * zzz;
        let y_1 = innerWidth / 2 + Math.cos((degree - degreeI) * Math.PI/ 180) * zzz
        return y - y_1;
    };
    function HamSO(x,a,b){return y = (-a*x)/(b)}
    function HamSoII(x, a, b, c) {
        return (a * (x * x)) + (b * x) + c; // Hàm bậc hai
    }
    function DoThi(t,tI){
        let dothi = [15*Math.pow(Math.sin(t),3), -(12*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]
        let dothi_1 = [15*Math.pow(Math.sin(t-tI),3), -(12*Math.cos(t-tI)-5*Math.cos(2*(t-tI))-2*Math.cos(3*(t-tI))-Math.cos(4*(t-tI)))]
        return [dothi[0] - dothi_1[0], dothi[1]-dothi_1[1]]
    }

    function loop() {
        requestAnimationFrame(loop);
        // canvas.width = innerWidth;
        // canvas.height = innerHeight;
        // ctx.clearRect(0, 0, innerWidth, innerHeight);

        

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
        ctx.fill();

        if (zzz >= 500){zzz = 0}

        // Cập nhật vị trí
        if (keydowns.A) { x -= 2; }
        if (keydowns.W) { y -= 2; }
        if (keydowns.S) { y += 2; }
        if (keydowns.D) { x += 2; }

        if (keydowns.O){y += Sin(degree,zzz)}
        if (keydowns.P){x += Cos(degree,zzz)}
        degree += degreeI;

        if (keydowns.H){
            y = innerHeight - (-HamSO(x,1/2,3))
            x++
            console.log(innerHeight - y)
        }
        if (keydowns.K){
            y = innerHeight - HamSoII(x, a, b, c);
            x+= 0.1
            console.log(innerHeight - y)
        }

        switch (true){
            case keydowns["T"]:
                zzz++
                break;
            case keydowns["Y"]:
                zzz--
                break;
        }

        if (" " in keydowns && (degreeDash <= 90 && degreeDash >= 0)){
            let dashOx = Cos(degreeDash,zzz)
            x += dashOx;
            degreeDash -= 5;
            console.log(degreeDash)
        }
        if (!(" " in keydowns)){
            degreeDash = 90;
        }

        if (keydowns.M | click){
            x += DoThi(t,tI)[0] * 10;
            y += DoThi(t,tI)[1] * 10;
            t+= tI
        }
    
    }; loop();

    document.addEventListener("keydown", (e) => {
        keydowns[e.key.toLocaleUpperCase()] = true;
    });
    document.addEventListener('keyup', (e) => {
        delete keydowns[e.key.toLocaleUpperCase()];
    });
    document.addEventListener("mousedown", () => {
        click = true
    })
    document.addEventListener("mouseup", () => {
        click = false;
    });
});