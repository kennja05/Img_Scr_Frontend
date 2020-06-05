Background
==========

The game begins by creating a 3x3 grid, with eight of grid segments holding a part of a whole image, and the ninth segment is blank. The nine segments are scrambled in random order at the beginning of the game, and it is then the job of the user to reassemble the image by moving the blank segment around the board by using the arrow keys.

Live Site
=========

https://image-scrambler-game.herokuapp.com/

Video Demonstration
===================

https://www.youtube.com/watch?v=BNmb7fpG_LQ

Instructions
============

1) Setup

    a) Clone the repo to your local machine and run the command 'cd Image-Scrambler-Game' in the terminal
    
    b) Open a second terminal tab
    
    c) In the first terminal tab run the command `cd img_scrmblr_backend`
    
    d) Enter the commands `rails db:create`, `rails db:migrate`, and finally `rails s`
    
    d) In the second terminal tab run the command `open index.html` 
    
        i)Alternatively, right click on the index.html file, select 'copy path', and paste it into the browser.

2) Usage

    a) Once setup is complete begin the game by clicking the 'start game' button at the top of the page
    
    b) Use the arrow keys to move the white square around
    
    c) Move the white square around to reassemble the scrambled image 
    
    d) If stuck, the user can click the 'reshuffle' button in order to start back from the beginning 
    
    e) The game will be over when the user successfuly assembles the image pieces, or closes the page  

Features
========

**Getting Started**

![STARTUP](https://media.giphy.com/media/UrPH02ZBQqXk0ZW9Qk/giphy.gif)

**Gameplay**

![GAMEPLAY](https://media.giphy.com/media/ckThXih9Pi1Oyzyh6M/giphy.gif)

**Winning the Game**

![GAMEOVER](https://media.giphy.com/media/WqG4OWOPnen5GVE036/giphy.gif)

*Created by Alisher Fayzimatov and Jacob Kenny*
