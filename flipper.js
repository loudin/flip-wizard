(function(){
  var dataFlipParents = $("*[data-flip-parent]");
  if (dataFlipParents.length == 0)  return false;
  
  var flipVals = ["one","two","three","four","five"];
  dataFlipParents.click(function(){
		//If you click on an attribute with data-flip-parent, we need to perform some code here.
    var flipParentId = $(this).attr("data-flip-parent").slice(1);
    var flipParent = $("#"+flipParentId);
    var currentElem = null;
    
    //Find the proper flip-element parent of the button. It's convoluted because of nesting.
    var allParents = $(this).parents();
    allParents.each(function(index,elem){
      if ( $(elem).attr("id") == flipParentId ){
        for (var i = index; i >= 0; i--){
          if (allParents.eq(i).hasClass("flip-element")){
            currentElem = allParents.eq(i);
            break;
          }
        }
      }
    });
    
		// "one", "two", "three", etc. of what we are switching to. If we are past the end, we toggle back to the beginning.
		var switchTo = flipVals[currentElem.index()+1];
    if (flipParent.children(".flip-"+switchTo).length == 0){
      switchTo = flipVals[0];
    }
    
		//We have currentElem. We are looking for event callbacks.
		var currentEvents = $._data( currentElem[0], "events" );
		var nextElem = flipParent.children(".flip-"+switchTo);
    var nextEvents = $._data( nextElem[0], "events" );

		//If should-flip is bound, we trigger it. Otherwise, we just go ahead with the code.
    if (currentEvents && currentEvents["should-flip"]){
      currentElem.trigger("should-flip", function(shouldFlip){
        if (!shouldFlip)  return false;
        flipParent.attr("class","flip-container").addClass("flip-to-"+switchTo);
        nextElem.trigger("was-flipped");
      });
    }
    else{
      flipParent.attr("class","flip-container").addClass("flip-to-"+switchTo);
      nextElem.trigger("was-flipped");
    }
    return false;
  });
})();