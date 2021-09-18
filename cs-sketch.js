// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2021-08-28 22:20:02 Chuck Siska>

// ============================================================
// TOC of Things
// var g_canvas 
// var g_frame_cnt
// var g_frame_mod
// var g_stop
// 
// function setup() // P5 Setup Fcn, must be called for Anim to work.
// function move_bot( ) // Move the bot in new direction & update color.
// function get_rgb( cpix ) // Get RGB integer color at canvas pixel pos.
// function paint_cell_interior( cell ) // Paint grid-cell insides, with pre-set color.
// function draw_bot( ) // Convert bot pos to grid pos & draw bot cell.
// function draw_update()  // Update our display, move & draw bot cell.
// function draw()  // P5 Frame Anim-draw Fcn, Called for Every Frame at Frame-rate.
// function keyPressed( ) // P5 fcn, called for every keypress.
// function set_bot_pos( ) // Update bot cell pos based on mouse's canvas pixel pos.
// function mousePressed( ) // P5 fcn, called for every mouse-press.
// ============================================================

// Make our own global, g_canvas, JS 'object': a key-value 'dictionary'.
// (Our g_canvas is just a suitcase - the P5 canvas has the pixels, themselves.)
var g_canvas = { // JS Global var, w canvas size info.
    cell_size: 10, 
    wid: 64, 
    hgt: 48 
}; 
var g_frame_cnt = 0;  // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

// Global direction variable, this will get used a lot
let dir = 0;

// TODO: Delete all NOTE comments after code is running properly
// NOTE: Colors used are: Black, Puce, Lavender, and Blue
// HEX for colors are used here for simplicity
const PUCE = '#cc8899';     // Turn Left
const BLUE = '#0000ff';     // Turn Left
const BLACK = '#000000';    // Turn Right
const LAVENDER = '#e6e6fa'; // Turn Right
// Constant Array COLORS will hold our colors, use this to cycle the colors on the grid
const COLORS = [PUCE, BLUE, BLACK, LAVENDER];


// Directions that the ant is facing, CONST used as it is easier to visualize direction
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;


// P5 Setup Fcn, must be called for animation to work
function setup() { 
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;

    createCanvas( width, height );  // Make a canvas from the P5 library
    draw_grid( 10, 50, 'white', 'yellow' ); // Calls fcn in another (loaded) file.
}


/* Here are some more simple multi-slot objects we use. */
// Dir is 0..7 clock, w 0 up.
var g_bot = { 
    dir: 3, 
    x: 20, 
    y: 20, 
    color: 'ffffff' 
}; 
// Box in which bot can move.
var g_box = { 
    t: 1, 
    hgt: 47, 
    l: 1, 
    wid: 63 
}; 



function start_bot() { // Start the direction of the bot & update color.

    dir = UP; // Change direction at random; brownian motion.
    
    // Ant will always start at the middle of the board
    let dx = 10;
    let dy = 4;
    
/*    // A simple way to change bot direction, with a "compass direction ptr".
//    switch(dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Right,4=Down,6=Left. 
//        case 0: { /* up, N. /
//            dy = 1; 
//            break; 
//        }
//        case 1: { /* NE. /
//            dx = 1; 
//            dy = -1; 
//            break; 
//        } 
//        case 1: { /* right, E. /
//            dx = 1; 
//            break; 
//        } 
//        case 3: { /* SE ... /
//            dx = 1; 
//            dy = 1; 
//            break; 
//        } 
//        case 2: {         
//            dy = -1; 
//            break; 
//        }
//        case 5: { 
//            dx = -1; 
//            dy = 1; 
//            break; 
//        }
//        case 3: { 
//            dx = -1; 
//            break; 
//        }
//        case 7: { 
//            dx = -1; 
//            dy = -1; 
//            break; 
//        }
//    }
*/
    
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    let color = BLACK;  // Initialize the color to Black
    //let color = 100 + (1 + g_bot.color) % 156; // Incr color in nice range.

    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    g_bot.color = color;

    // Log actions into the console, ins't necessary but helpful for debugging 
    console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function move_bot() { // Move the bot in new direction & update color.

    //dir = (round (8 * random( ))); // Change direction at random; brownian motion.
    let dx = 0;
    let dy = 0;

    // Change the direction of the Ant based on the color of the square its on
    // TODO: Add color var to be passed in the fuction for our FSM to read in the information
    switch(color) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Right,4=Down,6=Left. 
        case PUCE: { // Move Left
            // TODO: Change the direction of the Ant to face Left 
            --dir;
            if(dir === -1) { dir += 4; } // TODO: TEST THIS { dir = LEFT; }
            dx = -1; 
            break; 
        }
        case BLUE: { // Move Left
            // TODO: Change the direction of the Ant to face Left 
            --dir;
            if(dir === -1) { dir += 4; } // TODO: TEST THIS { dir = LEFT; }
            dx = -1; 
            break; 
        } 
        case BLACK: { // Move Right
            // TODO: Change the direction of the Ant to face Right
            ++dir;
            if(dir === 4) { dir -= 4; } // TODO: TEST THIS { dir = UP; }
            dx = 1; 
            break; 
        } 
        case LAVENDER: { // Move Right
            // TODO: Change the direction of the Ant to face Right
            ++dir;
            if(dir === 4) { dir -= 4; } // TODO: TEST THIS { dir = UP; }
            dx = 1; 
            break; 
        } 
    }

    // TODO: Move the direction of the Ant one cell forward
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    let color =  100 + (1 + g_bot.color) % 156; // Incr color in nice range.

    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    g_bot.color = color;

    // Log actions into the console, ins't necessary but helpful for debugging 
    console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function get_rgb(cpix) { // Get RGB integer color at canvas pixel pos.
    // Cpix needs slots .x, .y, (canvas pixel coords).
    let acolors = get(cpix.x, cpix.y); // Get pixel color [RGBA] array.

    let pix_rgb =  // Ignore A = acolors[3], the transparency.
        (256 // Compose via Horner's Method.
         * (256 * (acolors[ 2 ]) // B
            +  acolors[ 1 ])) // G
        + acolors[ 0 ]; // R

    // Log actions into the console, ins't necessary but helpful for debugging  
    //console.log( "acolors,pix_rgb = " + acolors + ", " + pix_rgb );

    return pix_rgb;
}

function paint_cell_interior(cell) { // Paint grid-cell insides, with pre-set color.
    // Skip cell 1-pixel border, just paint insides.
    // Cell needs slots .x, .y, (canvas pixel coords) and .cell_size (in pixels);
    let sz = cell.cell_size;
    let x_in = 1 + (cell.x * sz); // Interior is one pixel inside cell, from top-left.
    let y_in = 1 + (cell.y * sz);
    let wid = sz -2; // Get width inside cell walls.

    rect(x_in, y_in, wid, wid); // Draw a rectangle with rect() from P5 library
}

function color_of_cell() { // This function return the current color of the cell
    if(stroke('white')) {
        return 'white';
    }
}

function draw_bot( ) // Convert bot pos to grid pos & draw bot cell.
{
    let sz = g_canvas.cell_size;
    let x_in = 1 + g_bot.x * sz; // Set x one pixel inside the sz-by-sz cell.
    let y_in = 1 + g_bot.y * sz;
    let cpix = { x:x_in, y:y_in }; // cell-interior pixel pos, new obj.
    // Set drawing color for cell interior (fill) to bot's current painting color.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    for(let i = 0; i < 4; ++i) {
        if(g_bot.color === COLORS[i] && i != 3) {
            fill("#" + COLORS[i+1]);
            break;
        }
        else {
            fill("#" + COLORS[0]);
        }
    }
    
    //fill("#" + g_bot.color); // Concat string, auto-convert the number to string.
    //console.log( "x_in,y_in = " + x + "," + y );
    let cpix_rgb = get_rgb(cpix);

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    if (0 != cpix_rgb) { /* This cell has color? */
        // Turn off color, both interior (fill) and border (stroke).
        fill(0);
        stroke(0);
    }
    else { stroke('white'); } // Else none, Bot is visiting, so color border white.

    // Paint the cell.
    let cell = { x:g_bot.x, y:g_bot.y, cell_size:sz }; // new obj.
    paint_cell_interior(cell);
}

function draw_update()  // Update our display, move & draw bot cell.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot();
    draw_bot();
}

function draw() // P5 Frame Anim-draw Fcn, Called for Every Frame at Frame-rate.
{
    // If it is the first time running the code, set up the direction for the ant to start moving properly
    if(g_frame_cnt == 0) {
        start_bot();
        draw_bot();
        ++g_frame_cnt;
    }

    /* TODO: Put this code back to let the program run freely
    // NOTE: Running frame by frame for testing purposes
    ++g_frame_cnt; // Count each P5 frame-draw request.
    if(!g_stop) draw_update(); // Draw bot only if it is moving.
    */
}

function keyPressed() { // P5 function called for every keypress.
    // Press spacebar to toggle the bot move-paint on/off
    if(keyCode === 32) {
        g_stop = !g_stop
    }

    // TODO: Erase this code to let the program run freely in draw()
    // NOTE: Run frame by frame by pressing right arrow, for testing purposes 
    if(keyCode === RIGHT_ARROW) {
        ++g_frame_cnt; // Count each P5 frame-draw request.
        if(!g_stop) draw_update(); // Draw bot only if it is moving.
    }
}

function set_bot_pos() { // Update bot cell pos based on mouse's canvas pixel pos.
    //  Req's cell-to-pixel tranlation.
    let x = mouseX;  // Get P5 mouse canvas pixel coords.
    let y = mouseY;

    //console.log( "mouse x,y = " + x + "," + y );

    // Convert canvas coords to the "fatter" grid-cell coords.
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );

    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );

    g_bot.x %= g_box.wid; // Wrap to fit grid-box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );

    g_bot.y %= g_box.hgt; // Wrap to fit grid-box.
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
}

function mousePressed() // P5 fcn, called for every mouse-press.
{
    set_bot_pos();
    draw_bot();
}
