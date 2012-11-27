# Octocarina of time

![](https://raw.github.com/Octocarina/game-off-2012/master/img/README/octocat-link-small.png) 

### Click [here](http://gelisam.com/octocarina) to play!

![](https://raw.github.com/Octocarina/game-off-2012/master/img/README/screenshot1.png) ![](https://raw.github.com/Octocarina/game-off-2012/master/img/README/screenshot2.png) 

The game is self-contained; you don't need to read any of the explanations below to figure out how to play. In theory. If you get stuck, it might helpt to read the "What does the fork do??" section below.


## Game mechanic: Revert changes, replay changes

This is a puzzle game in which you carry a fork, push blocks, and go back in time.

In git-speak, the Master Fork allows you to work on a tempory branch, to cherry-pick a subset of the block pushes you perform inside that branch, then to rebase those changes onto the master branch. **Important**! You do *not* need to understand the previous sentence in order to have fun playing the game.


## What does the fork do??

If you are having a hard time understanding what the fork does, don't worry, you're not alone! I spent the *majority* of the development time trying to make the mechanic easier to understand, but many of our beta testers still couldn't figure it out.

Here is a step-by-step guide on using the fork.

1.  Face towards a block and press Z to stab it into the block.
1.  Push that block somewhere else.
1.  Push another block.
1.  Go back to the first block and use Z to pick up the fork.

After you do this, the following happens.

1.  All the actions which were performed since the block was stabbed are undone.
1.  From those actions, those which involved moving the stabbed block are redone.

One puzzle-solving strategy you can use this mechanic for is as follows.

1.  Decide which block you want to move. Stab it.
1.  Move the other blocks out of your way.
1.  Move the stabbed block to its target location.
1.  Pick up the fork.

The important part about this strategy is that in step 2, it doesn't matter which block you move and where you move them, because their movements will be reverted anyway.

## Art Credits

I am using PlanetCute, a [free tileset](http://www.lostgarden.com/2007/05/dancs-miraculously-flexible-game.html) generously offered by Daniel Cook for the express purpose of *not* making yet another Sokoban clone. Which this game kind of is, before you start using the Master Fork. Sorry, Danc! Anyway, [his blog](http://www.lostgarden.com/) is a great source of insight for independent games developers.

I also borrow a character from <a href="http://doctor-gus.deviantart.com/">Doctor-Gus</a>, an artist who makes jewelry out of forks. But I can't tell you which character without spoiling the ending.
