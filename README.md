## Inspiration
The inspiration from this project was the idea of combining computer vision pose estimation with generative art.

## What it does
Flow Form lets you use your body movements to change the generative art. 
**Make sure you stand back so that it can capture your whole body.**

### Here is a breakdown of the movements: 
- Nose: Move left to right across the screen to change the line thickness
- Left wrist
  - Move left to right to change how fast the hue changes
  - Move up and down to change the brightness 
- Rigth wrist
  - Move left to right to change the saturation
  - Move up and down to change the alpha value
- Left Ankle: Move left to right to change the angle multiplier
- Right Ankle: Move left to right to change the speed of the particles

### Additional Controlls
- Press 's' to save a picture
- Press 'f' to go full screen

## How we built it
I used p5.js to generate the art and add controlls and PoseNet for the pose estimation.

## Challenges we ran into
The video on p5.js is mirrored, so I had to figure out how to tweak the values to accomodate for that. The coordinates from PoseNet also don' seem to be getting on the Canvas as accurately as I'd like.

## Accomplishments that we're proud of
I am proud to have finished this project on time. I was worried being a solo hacker that I would run out of time, but I'm really proud of my projet and think it's a cool and fun way to apply Computer Vision.

## What we learned
I have never worked with Perlin noise in JS and it was interesting to learn. I have also never made generative art using noise or pose estimation/computer vision, so it was really interesting to go thorugh that and see the posssbilities of what I can do and hoow I can use Computer Vision in combination with p5.js. In the future, I'd love to expand on this project and explore other ways to generate art using pose estimation. 

## What's next for Flow Form
In the future, I'd like to add features that let the user choose between multiple different types of generative art. I would also like to use a different pose estimation model that can detect fingers and faial expressions. PoseNet is really nice but is more limited because it only tracks 17 points. I would like to use a library that would let me add features that let the user use hand gestures or facial expressioons to control the generative properties.
