flip-wizard
===========

Use CSS3 transitions with minimal javascript to lead your users through a wizard-like interface.

#Depdencies
[jQuery](http://jquery.com/). Tested with 1.9.0.

#How to use
Include the flipper.css and flipper.js with your project.

Flipper.js will automatically detect when you want to use the wizard if you structure your HTML correctly:

```html
<div id="container-id" class="flip-container">
  <div class="flip-element flip-one flip-up">
    <h1>First Step!</h1>
    <p>...</p>
    <a href="#" data-flip-parent="#container-id">Next</a>
  </div>
  <div class="flip-element flip-two flip-up">
    <h1>Second Step!</h1>
    <p>...</p>
    <a href="#" data-flip-parent="#container-id">Next</a>    
  </div>
  <div class="flip-element flip-three flip-up">
    <h1>Third Step!</h1>
    <p>...</p>
    <a href="#" data-flip-parent="#container-id">Next</a>
  </div>
</div>
```

Note that the container has its own unique ID and the class 'flip-container'. Each child has 'flip-element' along with its order in plain english (e.g. flip-one, flip-two, etc.). You can specify the direction,too. Currently two are supported: flip-up and flip-left.

Finally, to go to the next step, you must include an attribute data-flip-parent in your link that references the unique ID of the flip-container. This extra bit of setup is worth it because you now have a functioning wizard out of the box with no coding.

#Callbacks
I also provide two callbacks if you want to provide advanced functionality. They are "should-flip" and "was-flipped". They are called on individual 'flip-element's to determine if the user should move onto the next step and to alert the user that the element was flipped, accordingly.

Let's say you have a flip element:
 
```html
<div class="flip-element flip-one flip-up" id="first-flip">
  ...
</div>
```
  
You could write:

```javascript
$("#first-flip").on("should-flip",function(e, shouldFlipCallback){
  //Flip the tile based on a random number.
  var randInt = Math.floor( Math.random()*10 );
  if (randInt <=5 ){
    shouldFlipCallback(false);  //Passing this will prevent the tile from being flipped to flip-one.      
  }
  else{
    shouldFlipCallback(true);  //Passing this will allow the tile to be flipped.
  }
});

$("#first-flip").on("was-flipped",function(){
  alert("I was flipped!");
});
```
  
This can be very powerful if you need the user to complete particular steps before moving onto the next.

#Limitations
* The CSS is hard-coded for just five transitions. I would like to explore ways to make this scalable.
* 'flip-element's must be direct children of the flip-container.

#Improvements
* Clean up CSS
* Clean up Javascript
* Minify Javascript
* Provide a way to call the script manually