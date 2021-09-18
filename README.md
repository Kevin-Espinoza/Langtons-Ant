# Lark's Ant


I've tried to make some progress using what knowledge I had.
1. I added a start_bot() function which is supposed to only run once and serves to set up the Ant to properly work.
2. I added a few constant variables to help navigate the ant. There are also constant variables that serve to hold the hex values of the colors we are supposed to use.
3. move-bot() is completely broken. I'll try to find a fix for it. As it is now, the Ant just stays in the cell it started at. As a side note: I am using the switch statement as our FSM and am using the color as the parameter as that will let us know what direction the Ant should move. Once we get the Ant to move based on the color of the square we can add the 'don't move' functionality. This just makes it so that the Ant won't move even though it touched a color square. Maybe we can make a random number gen and use that as a way to test odds of it not moving. NOTE: the switch parameter still needs a way to check what color the Ant is on.
4. I made it so that pressing the Right Arrow key will update the grid. This way it is easier to see what the Ant is doing. Once the program is ready to go we can make it update automatically until the 2000 updates have been completed. Pressing the space bar will pause the program, but that is irrelavant rn since we need to manually update the grid.
5. I'm lost again lol.


If you guys can try to mess with the code, please do. 
