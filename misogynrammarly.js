document.addEventListener('focusin', function() {
  update();
}, true);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      console.log('Space pressed');
      update();
    }
}

function update(){ //update the check
  if (['TEXTAREA', 'INPUT'].includes(document.activeElement.nodeName)) {
    // it is in textarea, input
    console.log("1");
    checkMisogyny(document.activeElement.value);
  }
  else if (document.activeElement.isContentEditable) {
    // it is in contentEditable element
    console.log("2");
    checkMisogyny(document.activeElement.innerHTML);
  }
  else {
    // not above
    console.log("3");
  }
}

//map of words and suggestions
const map = new Map();
map.set('sorry', 'replace with a thank you for their accommodation'); //value cannot include full key or will cause issues
map.set('maybe', 'have some more confidence!');
map.set('i think', 'you know!');
map.set('just', 'consider rephrasing');
map.set('can you please', "a 'please' will suffice!");
map.set('probably', 'be more certain!');
map.set('might', 'you can do it!');
map.set('does that make any sense?', 'it makes sense!');
map.set('am i making any sense?', 'you are making sense!');
map.set("i'm not too sure", "don't doubt yourself!");
map.set('i was wondering', 'be more direct!');
map.set("i'm no expert", "don't underestimate yourself!");

var styleEl = document.createElement('style');
styleEl.innerHTML = '.highlighted{background-color:#ffabc9; color:black !important;}';
document.head.appendChild(styleEl);

//check for misogyny-conforming language
function checkMisogyny(text){
  console.log(text); //returns the text
      if(text != null && text != undefined){
        //remove previous spans
        var current = '<span class="highlighted"';
        text = deleteSpans(current, text);
        current = '</span>';
        text = deleteSpans(current, text);

      //detect and highlight key words
      const keys = map.keys();
      var innerHTML = text;
      for(let i = 0; i<map.size; i++){
          current = keys.next().value;
           if((text.toLowerCase()).includes(current)){
              console.log(map.get(current));
                var index = innerHTML.toLowerCase().indexOf(current);
                var newIndex = -1;
                if (index >= 0) {
                 innerHTML = innerHTML.substring(0,index) + `<span class="highlighted" title="${map.get(current)}">` + innerHTML.substring(index,index+current.length) + "</span>" + innerHTML.substring(index + current.length);
                 newIndex = innerHTML.toLowerCase().indexOf(current, index);
                }
                while (newIndex >= 0) { //find other instances of the word
                 innerHTML = innerHTML.substring(0,newIndex) + `<span class="highlighted" title="${map.get(current)}">` + innerHTML.substring(newIndex,newIndex+current.length) + "</span>" + innerHTML.substring(newIndex + current.length);
                 index = newIndex;
                 newIndex = text.toLowerCase().indexOf(current, index);
                }
            }
      }
      //detect amount of exclamation marks used
      let exclamationCount = text.split("!");
      if(exclamationCount.length>3){
        index = innerHTML.lastIndexOf("!");
        innerHTML = innerHTML.substring(0,index) + `<span class="highlighted" title="use less exclamation marks to sound more serious and professional">` + "!" + "</span>" + innerHTML.substring(index + 1);
      }
      document.activeElement.innerHTML = innerHTML;
   }
}

//get rid of old spans
function deleteSpans(current, text){
  var innerHTML = text;
  var i = innerHTML.indexOf(current);
  var newI = -1;
  if (i >= 0) {
   innerHTML = innerHTML.substring(0,i) + "" + innerHTML.substring(innerHTML.indexOf(">", i)+1);
   newI = innerHTML.indexOf(current, i);
  }
  while (newI > 0) {
   innerHTML = innerHTML.substring(0,newI) + "" + innerHTML.substring(innerHTML.indexOf(">", newI)+1);
   i = newI;
   newI = innerHTML.indexOf(current, i);
  }
   return innerHTML;
}
