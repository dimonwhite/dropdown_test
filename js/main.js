function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

function initDropdown(class_name){

  if(class_name === undefined){
    class_name = 'main_dropdown';
  }
  var container = document.querySelector('.' + class_name);
  var dropdown_select = container.querySelector('.dropdown_select');
  var title = container.querySelector('h1');
  var dropdown_input = container.querySelector('.dropdown_input');
  var open_dropdown = container.querySelector('.open_dropdown');

  var temp_string = '';

  open_dropdown.addEventListener("click", function(){
    dropdown_input.focus();
    focusInput();
  });

  dropdown_input.addEventListener("focus", focusInput);

  dropdown_input.addEventListener("blur", blurInput);

  dropdown_input.addEventListener("input", changeInput);

  window.onscroll = function(){
    dropdown_input.blur();
  };

  function focusInput(){
    if(dropdown_input.value != ''){
      dropdown_input.value = '';
    }
    getPlayers();
  }

  function blurInput(){
    if(dropdown_input.value != '' && temp_string == ''){
      dropdown_input.value = '';
    }
    else if(temp_string != ''){
      dropdown_input.value = temp_string;
    }
    setTimeout(function(){dropdown_select.innerHTML = ''}, 200);
  }

  function changeInput(){
    var input_value = dropdown_input.value;

    getPlayers(input_value);
  }

  function getPlayers(input_value){

    var massiv = ["Pele", "Diego Maradona", "Ronaldo", "Paolo Maldini", "Lev Yashin", "Ronaldinho", "Cristiano Ronaldo", "Lionel Messi", "Johan Cruyff", "Marco van Basten", "Lothar Matthaus", "George Best", "Ruud Gullit", "Franco Baresi"]

    dropdown_select.innerHTML = '';

    var i = 0;

    function findPlayers(){
      var item = createNode('p');

      item.innerHTML = massiv[j];

      item.classList.add('dropdown_select_item');

      item.addEventListener("click", function(){
        dropdown_input.value = this.innerHTML;
        temp_string = this.innerHTML;
      });

      append(dropdown_select, item);

      i++;

      if( i>=5 ){
        dropdown_select.classList.add('overflow');
      }
      else{
        if(dropdown_select.classList.contains('overflow'))
          dropdown_select.classList.remove('overflow');
      }
    }

    for (var j = 0; j < massiv.length; j++) {

      var string = massiv[j];

      if(input_value === undefined){
        findPlayers();
      }
      else{
        if(string.toLowerCase().startsWith(input_value.toLowerCase())){
          findPlayers();
        } 
      }
    }
  }


}

initDropdown();