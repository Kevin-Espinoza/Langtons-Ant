
//****************************************************************************************************************************
//  Program name: "Lark's Ant" 
//  The purpose of this program is to print the path of "Lark's Ant"
//  09-25-2021 Kevin Espinoza
//                                                                           
//  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License  
//  version 3 as published by the Free Software Foundation.                                                                    
//  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied         
//  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.     
//  A copy of the GNU General Public License v3 is available here:  <https://www.gnu.org/licenses/>.                            
//****************************************************************************************************************************

//*****************************************************************************************************************************
//  Author information
//  Author name: Kevin Espinoza
//  Author email: k.espinoza1012@gmail.com
//  Lark's Ant
//
//  File Name: main.js
//  Language: JavaScript
//  Purpose: This is the script file for Lark's Ant. The purpose of this file is to draw and update each frame 
//  of our moving ant. This program utilizes the P5-JS library for many of its functions, they
//  will be marked in the project by comments. 
//    
//  Note: This project follows the instructions as set by Professor C. Siska, CPSC 335-03
//****************************************************************************************************************************


// The direction of the Ant will be handled by a numeric system with the values shown
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

// Save the dimentions of the canvas 
const COLUMNS = 60;
const ROWS = 40;

// Colors
const BLACK = 0;    // Black  -> Turn Left
const BLUE = 1;     // Blue   -> Turn Right
const YELLOW = 2;   // Yellow -> Go Straight and call Countdown mode
const RED = 3;      // Red    -> Turn Right

// FSM States
const NORMAL = 0;
const STRAIGHT = 1;
const COUNTDOWN = 2;


class Ant {
    constructor(x, y) {
        this.postition = createVector(x, y);
        this.dir = UP;  // By default, our Ant is facing up
        this.mode = 0;  // TODO: Add more info and make sure our mode works as it should
        this.count = 0; 
    }

    turn_left() {
        --this.dir; 
        if(this.dir === -1) { this.dir = LEFT; }   // The direction is out of bounds, reset it back to LEFT
    }

    turn_right() {
        ++this.dir; 
        if(this.dir === 4) { this.dir = UP; }   // The direction is out of bounds, reset it back to UP
    }

    walk_forward() {
        // Get the direction that the Ant is facing and walk forward based on that value
        switch(this.dir) {  // TODO: Maybe add a console log?
            case(UP): { // TODO: Check why y is negative
                this.postition.add(0, -1);
                break;
            }
            case(RIGHT): {
                this.postition.add(1, 0);
                break;
            }
            case(DOWN): {
                this.postition.add(0, 1);
                break;
            }
            case(LEFT): {
                this.postition.add(-1, 0);
                break;
            }
            default:    // Throw an error at the user, this should not ever run
                alert('Error, something went wrong in var dir or Ant postition vector. ');
        }

        // Update the position of our vector
        this.position = createVector(((this.postition.x % 60) + 60) % 60, ((this.postition.y % 40) + 40) % 40);  
    }

    // Getters for our x and y positions of our vector
    get_x() { return this.postition.x; }
    get_y() { return this.postition.y; }
    
}

function setup() {  // P5 setup function
    createCanvas(800, 535); // P5 canvas size function
    frameRate(30);  //P5 framerate function

    cell = width/COLUMNS;   
    grid = [];  // Create an empty grid array

    for(let i = 0; i < COLUMNS; ++i) {
        grid.push([]);
        for(let j = 0; j < ROWS; ++j) {
            grid[i].push(3); // This makes all the squares in the canvas black 
        }
    }

    ant = new Ant(30, 20);
}

function draw() {
    for (let i = 0; i < COLUMNS; i++) {
        for (let j = 0; j < ROWS; j++) {
            switch(grid[i][j]) {
                // P5 fill function, sets the color for our rectangles
                case BLACK: {
                    fill('blue');   
                    break;
                }
                case BLUE: {
                    fill('yellow'); 
                    break;
                }
                case YELLOW: {
                    fill('red');    
                    break;
                }
                case RED: {
                    fill('black');  
                    break;
                } 
            }
            // P5 rect function, this function draws our rectangle and uses fill() for its color
            rect(i * cell, j * cell, cell - 1, cell - 1);
        }
      }


    if(ant.mode == NORMAL) {
        if (grid[ant.get_x()][ant.get_y()] === BLACK) {
            ant.count = grid[ant.get_x()][ant.get_y()];
            ant.turn_left();
        } 
        else if (grid[ant.get_x()][ant.get_y()] === BLUE || grid[ant.get_x()][ant.get_y()] === RED) {
            ant.count = grid[ant.get_x()][ant.get_y()];
            ant.turn_right();
        } 
        else {  //(grid[ant.get_x()][ant.get_y()] === YELLOW
            // Go straight, so we dont call a turn function
            ant.mode = STRAIGHT;
        }
    } 
    else if (ant.mode === STRAIGHT) {
        // Go straight, so we dont call a turn function
        ant.mode = COUNTDOWN;
    } 
    else {  // ant.mode === COUNTDOWN
        if (ant.count < 0) {
            ant.mode = NORMAL;
        }
        --ant.count;
        // Direction of ant doesn't change
    }
    
    // Move the ant forward and update its position
    ant.walk_forward();
    grid[ant.get_x()][ant.get_y()] = (grid[ant.get_x()][ant.get_y()] + 1) % 4;
}
