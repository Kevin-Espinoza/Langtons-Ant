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

// URGENT TODO: Change the colors that we have now to: black, blue, yellow, and red, in that order

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
// dx and dy will now be global as their data need to be shared through functions
let dx = 0;
let dy = 0;

// Array to hold the color value of the current cell
let color_coord = [];   // Empty array, we will use a 2D array


// TODO: Delete all NOTE comments after code is running properly
// HEX for colors are used here for simplicity
const BLACK = '#000000';    // Turn Right
const BLUE = '#0000ff';     // Turn Left
const YELLOW = '#e6e600';     // Turn Left
const RED = '#ff0000'; // Turn Right
// Constant Array COLORS will hold our colors, use this to cycle the colors on the grid
// TODO: Arrange the colors to match the sequence in the pdf
const COLORS = [BLACK, BLUE, YELLOW, RED];

// Directions that the ant would be moving in the grid
const LEFT = 0;
const RIGHT = 1;
const STRAIGHT = 2;
// Array to hold the countdown numbers
const COUNTDOWN = [LEFT, RIGHT, STRAIGHT]
// countdown timer for the array
let timer = 0;  // This timer should only be within 0 and 2, otherwhise we get an overflow
let timer_swap = false;


// Directions that the ant is facing, CONST used as it is easier to visualize direction
const ANT_UP = 0;
//const UP_RIGHT = 1;
const ANT_RIGHT = 1;
//const DOWN_RIGHT = 3;
const ANT_DOWN = 2;
//const DOWN_LEFT = 5;
const ANT_LEFT = 3;
//const UP_LEFT = 7;


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


 // This function will always only run once to start the Ant's movement and update the element's color
function start_bot() {

    // The ant will always start facing up
    dir = ANT_UP; 

    // TODO: FIX Ant will always start at the middle of the board
    dx = 1; // Our first element will be white so we turn right
    dy = 0; // This stays at 0
    
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.

    // After the code is working closer to it should, change the color value of this starting value
    let color = BLUE;
    //let color = 100 + (1 + g_bot.color) % 156; // Incr color in nice range.

    // TODO: Check to see if we still need g_bot in our code
    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    g_bot.color = color;    // Initialize the color to Black

    // Update our color_coord array to hold the coordinates of the cell and its color val
    color_coord[[x, y]] = color;

    // reset dx and dy
    dx = 0;
    dy = 0;
    
    // Log actions into the console, ins't necessary but helpful for debugging 
    console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}


// TODO: Fix move_bot() 
// NOTE: There is a bug where the code isn't progessing and I have a feeling its this function
function move_bot() { // Move the bot in new direction & update color.

    let color = color_coord[[g_bot.x, g_bot.y]];


    // NOTE: Our FSM switch is based on a countdown that makes the ant move positions
    //       The countdown is 0 -> 1 -> 2 -> 1 -> 0 -> ...
    // Change the direction of the Ant based on the color of the square its on
    // TODO: Add color var to be passed in the fuction for our FSM to read in the information
    switch(timer) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Right,4=Down,6=Left. 
        // TODO: match the arrangement of the switch cases to match the pdf format
        case 0: { // Move Left
            // TODO: Change the direction of the Ant to face Left 
            if(dir === 0){  // If we subtract one to dir while at 0, we get -1 which is out of
                dir = ANT_LEFT; // range so we reset it back to LEFT, which is 3
            }
            else {
                --dir;      // if dir is not at 0, subtract one normally
            }
            get_dir_left();
            break; 
        }
        case 1: { // Move Right
            // TODO: Change the direction of the Ant to face Left 
            if(dir === 0){
                dir = LEFT;
            }
            else {
                ++dir;      // if dir is not at 0, subtract one normally
            }
            // TODO: erase this after the code is working properly, idk if we will need this
            // if(dir === -1) { dir += 4; } // TODO: TEST THIS { dir = LEFT; }
            get_dir_right();
            break; 
        } 
        case 2: { // Move Straight
            // TODO: Change the direction of the Ant to face Right
            if(dir === 3){  // If we add one to dir while at 3, we get 4 which is out of
                dir = ANT_UP;   // range so we reset it back to UP, which is 0
            }
            else {
                dir;      // if dir is not at 3, add one normally
            }
            // TODO: erase this after the code is working properly, idk if we will need this
            // if(dir === 4) { dir -= 4; } // TODO: TEST THIS { dir = UP; }
            get_dir_straight();
            break; 
        }
    }
    // TODO: Move the direction of the Ant one cell forward
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    color_coord[[x, y]] = color;
    //let color =  100 + (1 + g_bot.color) % 156; // Incr color in nice range.

    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    g_bot.color = color;

    update_timer();

    // reset dx and dy
    dx = 0;
    dy = 0;

    // Log actions into the console, ins't necessary but helpful for debugging 
    console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function update_timer() {
    if(timer_swap === false) {
        ++timer;
        if(timer === 2) {
            timer_swap = true;
        }
    }
    if(timer_swap === true) {
        --timer;
        if(timer === 0) {
            timer_swap = false;
        }
    }
}

function get_dir_left() {
    if(dir === ANT_UP){
        dx = -1;
        dy = 0;
    }
    else if(dir === ANT_RIGHT){
        dx = 0;
        dy = 1;
    }
    else if(dir === ANT_DOWN){
        dx = 1;
        dy = 0;
    }
    else {  // dir === ANT_LEFT
        dx = 0;
        dy = -1;
    }
}

function get_dir_right() {
    if(dir === ANT_UP){
        dx = 1;
        dy = 0;
    }
    else if(dir === ANT_RIGHT){
        dx = 0;
        dy = -1;
    }
    else if(dir === ANT_DOWN){
        dx = -1;
        dy = 0;
    }
    else {  // dir === ANT_LEFT
        dx = 0;
        dy = 1;
    }
}

function get_dir_straight() {
    if(dir === ANT_UP){
        dx = 0;
        dy = 1;
    }
    else if(dir === ANT_RIGHT){
        dx = 1;
        dy = 0;
    }
    else if(dir === ANT_DOWN){
        dx = 0;
        dy = -1;
    }
    else {  // dir === ANT_LEFT
        dx = -1;
        dy = 0;
    }
}

function get_rgb(cpix) { // Get RGB integer color at canvas pixel pos.
    // Cpix needs slots .x, .y, (canvas pixel coords).
    let acolors = get(cpix.x, cpix.y); // Get pixel color [RGBA] array.

    let pix_rgb =  // Ignore A = acolors[3], the transparency.
        (256 * (256 * (acolors[ 2 ]) // B
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

// Return the color of the cell as a hex string
function color_of_cell() { // This function return the current color of the cell
    let sz = g_canvas.cell_size;
    let x_in = 1 + g_bot.x * sz; // Set x one pixel inside the sz-by-sz cell.
    let y_in = 1 + g_bot.y * sz;
    let cpix = { x:x_in, y:y_in };

    // cpix_rgb is an array holding the RGB Code of the square
    let cpix_rgb = get(cpix.x, cpix.y);

    // Convert cpix_rgb to a hex value and return it to the calling function
    let cpix_hex = '#' + cpix_rgb[0].toString(16) + cpix_rgb[1].toString(16) + cpix_rgb[2].toString(16);

    return cpix_hex;
}

function draw_bot() // Convert bot pos to grid pos & draw bot cell.
{
    let sz = g_canvas.cell_size;
    let x_in = 1 + g_bot.x * sz; // Set x one pixel inside the sz-by-sz cell.
    let y_in = 1 + g_bot.y * sz;
    let cpix = { x:x_in, y:y_in }; // cell-interior pixel pos, new obj.
    // Set drawing color for cell interior (fill) to bot's current painting color.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.

    // TODO: keeps running else case after 3rd run

    let color = color_coord[[g_bot.x, g_bot.y]];
    switch(color) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Right,4=Down,6=Left. 
        // TODO: match the arrangement of the switch cases to match the pdf format
        case BLACK: { 
            // change to next color
            color_coord[[g_bot.x, g_bot.y]] = BLUE;
            break; 
        }
        case BLUE: { 
            color_coord[[g_bot.x, g_bot.y]] = YELLOW;
            break; 
        } 
        case YELLOW: { 
            color_coord[[g_bot.x, g_bot.y]] = RED;
            break; 
        } 
        case RED: { 
            color_coord[[g_bot.x, g_bot.y]] = BLACK;
            break; 
        } 
        default: {
            // TODO: Make a default if needed, otherwise delete
        }
    }


    for(let i = 0; i < 4; ++i) {
        if(color_coord[[g_bot.x, g_bot.y]] === COLORS[i] && i != 3) {
            fill(COLORS[i+1]);
            // make a variable to hold location
            break;
        }
        else {
            fill(COLORS[0]);
        }
    }
    
    /*  NOTE: Keep this here for reference 
        TODO: delete after
    for(let i = 0; i < 4; ++i) {
        if(g_bot.color === COLORS[i] && i != 3) {
            fill(COLORS[i+1]);
            // make a variable to hold location
            break;
        }
        else {
            fill(COLORS[3]);
        }
    } 
    */
    
    
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
    if(g_frame_cnt === 0) {
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

