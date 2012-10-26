# Octocarina of time

This is just brainstorming at this point, but here is my idea. This drawing of Octocat dressed as Link, at the bottom of the [challenge page](https://github.com/blog/1303-github-game-off), was the source of my inspiration.

![](https://a248.e.akamai.net/camo.github.com/216c9ac4f3485cd4717ae5cabb33b1b39293f45d/687474703a2f2f692e696d6775722e636f6d2f536c644d772e6a7067)

## Origin

I immediately thought of a Zelda clone, featuring Octocat as Link. To fit the theme, I decided that Octocat should carry a fork instead of a sword. I thought that "Octocarina of Time" would be a nice parody name.

I then went to the whiteboard and wrote down ideas for the game. In the original [Ocarina of Time](http://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Ocarina_of_Time), the timeline splits into two (the "young Link" and "old Link" timelines) when Link picks up the Master Sword. I thought that this was another great opportunity to cater to the theme: Octocat shall *fork* the timeline by picking up the Master Fork.

I tried to imagine how the two forked timeline should interact, and I knew at once that I didn't want to make yet another [Chronotron](http://www.kongregate.com/games/Scarybug/chronotron) / [The Company of Myself](http://www.kongregate.com/games/2DArray/the-company-of-myself) / [P.B. Winterbottom](http://www.winterbottomgame.com/) clone. The different timelines should interact with each other, but the character should not interact with past clones of itself (even though "clones" is one of the themes). Trying to see if other GitHub concepts could be applied, I tried to come up with a way in which actions or objects in one timeline could be pushed or pulled between timelines. I came up with the following puzzle mechanics.

## Game mechanic: Pushing changes between timelines

This would be much, much clearer with pictures. I'll work on that next.

1. First, split the timeline.
2. In timeline A, Octocat moves block 1. This blocks his passage, but allows block 2 to be moved.
3. In timeline B, the blocks are still in their original locations.
4. Octocat A moves block 2, and pushes that move to timeline B.
5. In timeline B, block 2 moves, even though block 1 is still in its original location.  
   Without the ability to push changes between timelines, this configuration would be impossible, because block 1 is still in the way.
6. With block 2 out of the way, block 1 can be moved in a different direction.
7. Octocat B moves block 1. When moved in that direction, the block does not block the passage.
8. Octocat B proceeds through the passage and pushes block 1's move to timeline A.
9. In timeline A, block 1 had already been moved, so it's in a different location when timeline B's move is being applied.  
   Without the ability to push changes between timelines, this move would again be impossible, because Octocat A can't push block 1 from his side of the passage.
10. Now that block 1 no longer blocks the passage, Octocat A also proceeds through the passage.
11. The two Octocats proceed to the goal tile, merge, and move on to the next level.

That's it! That mechanic summarises the entire gameplay. Like [Escape from Puppy Death Factory](http://armorgames.com/play/12210/escape-from-puppy-death-factory)'s swap gun, this is probably a power which is very powerful, but which you must learn to adopt one step at a time, learning new tricks gradually as you encounter harder and harder obstacles.

## Details

A few more details about the mechanic:

* Changes to individual objects can be pushed individually; you don't need to push the entire timeline's changes.
* Changes to the same object, however, are linked together. When you push an object's changes to another timeline, you push all of the object's changes since the last change from that object which that timeline saw.
* If a change cannot be applied (because in that timeline, there is a wall in the way or something), then there is a conflict, and no more changes can be pushed from that object to that timeline.
* All forked Octocats must reach the goal tile.

I'm not sure how to deal with nested forks yet, maybe they shouldn't be allowed.
