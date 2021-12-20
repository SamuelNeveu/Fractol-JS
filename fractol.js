// const { Worker } = require('worker_threads');

function makeArray(w, h) {
    var arr = [];
    for (let i = 0; i < w; i++) {
        arr[i] = [];
        for (let j = 0; j < h; j++) {
            arr[i][j] = new Fractol;
        }
    }
    return arr;
}

function makePallette() {
    pallettes = [];
    pallettes.push([
        "#ffff7d",
        "#ffee7d",
        "#ffdf7e",
        "#ffcf7e",
        "#ffbf7e",
        "#ffaf7e",
        "#ff9f7e",
        "#ff8f7f",
        "#fe7e7f",
        "#ee6f7f",
        "#de5e7f",
        "#ce4f7f",
        "#be3f7f",
        "#ae2f7f",
        "#9d1f7f",
        "#8d0e7f"
    ])
    pallettes.push([
        "#f06d89",
        "#feaebf",
        "#fbc4d0",
        "#a4ece9",
        "#8fece8",
        "#beefed",
        "#8fa6ec",
        "#aebeef",
        "#f9cb8a",
        "#f6d19b",
        "#fedfb3",
        "#a39191",
        "#a58d8d",
        "#a17878",
        "#a77070",
    ]);
    // pallettes.push([65536 * 66 + 256 * 30 + 15,
    //     65536 * 25 + 256 * 7 + 26,
    //     65536 * 9 + 256 * 1 + 47,
    //     65536 * 4 + 256 * 4 + 73,
    //     65536 * 0 + 256 * 7 + 100,
    //     65536 * 12 + 256 * 44 + 138,
    //     65536 * 24 + 256 * 82 + 177,
    //     65536 * 57 + 256 * 125 + 209,
    //     65536 * 134 + 256 * 181 + 229,
    //     65536 * 211 + 256 * 236 + 248,
    //     65536 * 241 + 256 * 233 + 191,
    //     65536 * 248 + 256 * 201 + 95,
    //     65536 * 255 + 256 * 170 + 0,
    //     65536 * 204 + 256 * 128 + 0,
    //     65536 * 153 + 256 * 87 + 0,
    //     65536 * 106 + 256 * 52 + 3
    // ]);
    return pallettes
}

class Rgb {
    r = 0;
    b = 0;
    g = 0
    a = 0;
    value = 0;
}

class Color {
    color;

    constructor(real, ima, it) {
        this.real = real;
        this.ima = ima;
        this.it = it;
    }
}

class Fractol {
    z_i = 0;
    z_r = 0;
    c_i = 0;
    c_r = 0;
    iter = 0;
    x = 0;
    y = 0;
}

class Env {
    zoom = 200;
    max_iter = 100;
    x1 = -2.1;
    x2 = 0.6;
    y1 = -1.5;
    y2 = 0.2;
    cycle = 200;
    pixel;
    width;
    height;
    r = 0;
    g = 255;
    b = 255;
    p = 1;
    offsetx = 0;
    offsety = 0;
    user_color = 0;
    constructor(w, h) {
        this.pallettes = makePallette();
        this.pixel = makeArray(w, h);
    }
}

console.log("launch");
// process.on = async() => {
let fractol = new Fractol();
let canvas = document.getElementById('canvas');
canvas.width = 600; //window.innerWidth;
canvas.height = 600; //window.innerHeight;
ctx = canvas.getContext("2d");

let env = new Env(canvas.width, canvas.height);
env.width = canvas.width;
env.height = canvas.height;


env.pixel = makeArray(env.width, env.height, 0);
// setInterval(fractolLoop(env, fractol), 1000 / 15);
fractolLoop(env, ctx);

let but = document.getElementById('but');
but.onclick = () => {
    if (env.user_color == 2)
        env.user_color = 0;
    else
        env.user_color++;
    fractolLoop(env, ctx);
}
canvas.onclick = function(event) {
    if (event.clientX >= 0 && event.clientX < env.width && event.clientY >= 0 && event.clientY < env.height) {
        console.log(event.button);
        //env.x1 = (x / env.zoom + env.x1) - (x / (env.zoom / 1.25));
        //env.y1 = (y / env.zoom + env.y1) - (y / (env.zoom / 1.25));
        //if (env.max_iter >= 200)
        //    env.max_iter -= 5;
        //env.zoom /= 1.25;
        if (event.button == 0) {
            env.x1 = (event.clientX / env.zoom + env.x1) - (event.clientX / (env.zoom * 1.25));
            env.y1 = (event.clientY / env.zoom + env.y1) - (event.clientY / (env.zoom * 1.25));
            env.max_iter += 21;
            env.zoom *= 1.25;
            fractolLoop(env, ctx);
        }

    }
};
document.addEventListener('keydown', function(event) {
        if (event.key == 'r') {
            if (env.r >= 255)
                env.r = 0;
            else
                env.r += 10;
            fractolLoop(env, ctx);
        } else if (event.key == 'g') {
            if (env.g >= 255)
                env.g = 0;
            else
                env.g += 10;
            fractolLoop(env, ctx);
        } else if (event.key == 'b') {
            if (env.b >= 255)
                env.b = 0;
            else
                env.b += 10;
            fractolLoop(env, ctx);
        } else if (event.key == 'p') {
            if (env.p >= 2)
                env.p = 0;
            else
                env.p++;
            fractolLoop(env, ctx);
        } else if (event.key == 'PageUp') {
            env.zoom += 30;
            fractolLoop(env, ctx);
        } else if (event.key == 'PageDown') {
            env.zoom -= 30;
            fractolLoop(env, ctx);
        } else if (event.key == 'ArrowUp') {
            env.offsetx += 0.1;
            fractolLoop(env, ctx);
        } else if (event.key == 'ArrowDown') {
            env.offsetx -= 0.1;
            fractolLoop(env, ctx);
        } else if (event.key == 'ArrowLeft') {
            env.offsety -= 0.1;
            fractolLoop(env, ctx);
        } else if (event.key == 'ArrowRight') {
            env.offsety += 0.1;
            fractolLoop(env, ctx);
        }
        // else
        //     console.log(event.key);
    })
    // }

function fractolLoop(env, ctx) {
    ctx.clearRect(0, 0, env.width, env.height);
    fractolAlgo(env);
    if (env.user_color == 0)
        color_image(env, ctx);
    if (env.user_color == 1)
        color_image_rgb(env, ctx);
    if (env.user_color == 2)
        color_image_pallette(env, ctx);
}

function color_image_pallette(env) {
    let iter = 0;
    let color = "#FF0000";
    for (x = 0; x < env.width; x++) {
        for (y = 0; y < env.height; y++) {
            iter = Math.round((env.pixel[x][y].it * 125.5) % (env.pallettes[env.p].length - 1));
            color = env.pallettes[env.p][iter];
            ctx.fillStyle = color;
            // console.log(color, iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function color_image(env) {
    for (x = 0; x < env.width; x++) {
        for (y = 0; y < env.height; y++) {
            if (env.pixel[x][y].ima > 0) {
                ctx.fillStyle = 'rgb(0, 0, 0)';
            } else {
                ctx.fillStyle = 'rgb(255, 255, 255)';
            }
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

// function color_image_rgb(e, ctx) {
//     for (x = 0; x < e.width; x++) {
//         for (y = 0; y < e.height; y++) {

//             mult = e.pixel[x][y].real * e.pixel[x][y].real + e.pixel[x][y].ima * e.pixel[x][y].ima;
//             nu = (e.pixel[x][y].iter + e.cycle - Math.log2(Math.log2(Math.sqrt(mult)))) / e.max_iter;
//             nu_frac = nu - Math.floor(nu);
//             r = (nu_frac * 5) * e.r;
//             g = (255 - (nu_frac * 10)) * e.g;
//             b = (255 - (nu_frac * 2)) * e.b;
//             ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
//             ctx.fillRect(x + 600, y, 1, 1);
//         }
//     }
// }

function create_pallette(env) {
    var pallette = []; // the array that will hold the hex strings of the colors

    for (x = 0; x < 256; x++) // the loop that creates the pallette
    {
        if (x < 85) // colors 0-84
        {
            r = 3 * x;
            g = 0;
            b = 0;
        }
        if (x > 84 && x < 171) // colors 85-170
        {
            r = 0;
            g = 3 * (x - 84);
            b = 0;
        }
        if (x > 170) // colors 170-255
        {
            r = 0;
            g = 0;
            b = 3 * (x - 170);
        }

        r = r.toString(16); // conversion to hex
        g = g.toString(16);
        b = b.toString(16);

        if (r.length == 1) r = "0" + r; // add a zero in front to change single-digit to double digit
        if (g.length == 1) g = "0" + g;
        if (b.length == 1) b = "0" + b;

        pallette[x] = "#" + r + g + b; // final hex string
    }
    return pallette;
}

function color_image_rgb(env) {
    let pallette = create_pallette(env);

    for (x = 0; x < env.width; x++) {
        for (y = 0; y < env.height; y++) {
            ctx.fillStyle = pallette[env.pixel[x][y].it];
            ctx.fillRect(x, y, 1, 1);
            // console.log(env.pixel[x][y].it)
        }
    }
}

function fractolAlgo(env) {
    for (x = 0; x < env.width; x++) {
        for (y = 0; y < env.height; y++) {

            let fractol = mandelbrot(env);
            env.pixel[x][y] = new Color(fractol.z_r, fractol.z_i, fractol.iter);
            // console.log(env.pixel[x][y].it);
        }
    }
}

function init_fractol(env) {
    let fractol = new Fractol;

    fractol.c_i = (y / env.zoom) + env.y1 + env.offsetx;
    fractol.c_r = (x / env.zoom) + env.x1 + env.offsety;
    fractol.z_i = 0;
    fractol.z_r = 0;
    fractol.iter = 0;

    return fractol;
}

function mandelbrot(env) {
    let n;
    let f = init_fractol(env);

    n = f.z_r * f.z_r + f.z_i * f.z_i;
    while (n < 4 && f.iter < env.max_iter) {
        let tmp = f.z_r * f.z_r - f.z_i * f.z_i + f.c_r;
        f.z_i = 2 * f.z_i * f.z_r + f.c_i;
        f.z_r = tmp;
        f.iter++;
        n = f.z_r * f.z_r + f.z_i * f.z_i;
    }
    return f;
}



function color_helper(ic1, ic2, p) {
    let c = new Rgb;
    let c1 = new Rgb;
    let c2 = new Rgb;

    c1.rgb = fill_rgb(ic1);
    c2.rgb = fill_rgb(ic2);
    c.rgb.r = ft_lerp(c1.rgb.r, c2.rgb.r, p);
    c.rgb.g = ft_lerp(c1.rgb.g, c2.rgb.g, p);
    c.rgb.b = ft_lerp(c1.rgb.b, c2.rgb.b, p);
    c.rgb.a = 0x00;
    return (rgb(c.rgb.r, c.rgb.g, c.rgb.b));
}

function linear_color(e, p, c) {
    let index;

    index = fmod(p.i, e.cycle - 1) / (e.cycle - 1);
    index = index * e.pallettes[0].length;
    return (color_helper(c[round(index) + 1], c[round(index)], 0.5));
}