function createNode(element) {
  return document.createElement(element);
}

function append(parent, el){
  return parent.appendChild(el);
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}

function initDropdown(massiv, class_name){
  if(class_name === undefined){
    class_name = 'main_dropdown';
  }
  var containers = document.querySelectorAll('.' + class_name);
  for (var i = 0; i < containers.length; i++) {

    var temp_string = '';

    document.querySelector('.open_dropdown').addEventListener("click", function(){
      this.previousElementSibling.focus();
    });

    containers[i].querySelector('.dropdown_input').addEventListener("focus", focusInput);

    containers[i].querySelector('.dropdown_input').addEventListener("blur", blurInput);

    containers[i].querySelector('.dropdown_input').addEventListener("input", changeInput);

    window.onscroll = function(){
      var dropdown_inputs = document.querySelectorAll('.dropdown_input');
      for (var j = 0; j < dropdown_inputs.length; j++) {
        dropdown_inputs[j].blur();
      }
    };

    function focusInput(){
      if(this.value != ''){
        this.value = '';
      }
      findPlayers(undefined, this);
    }

    function blurInput(){
      if(this.value != '' && this.getAttribute('data-name') == ''){
        this.value = '';
      }
      else if(this.getAttribute('data-name') != ''){
        this.value = this.getAttribute('data-name');
      }
      var thisInput = this;
      setTimeout(function(){findPlayers('none', thisInput)}, 200);
    }

    function changeInput(){
      var input_value = this.value;

      findPlayers(input_value, this);
    }

    containers[i].querySelector('.dropdown_select').innerHTML = '';

    function getPlayers(){
      for (var j = 0; j < massiv.length; j++) {
        var item = createNode('p');

        item.innerHTML = massiv[j].label;

        item.setAttribute('data-img', massiv[j].img)

        item.classList.add('dropdown_select_item');

        item.style.display = 'none';

        item.addEventListener("click", function(){
          var input = this.parentNode.previousElementSibling.previousElementSibling;
          input.value = this.innerHTML;
          input.setAttribute('data-name', this.innerHTML);
          document.body.style.backgroundImage = "url(" + this.getAttribute('data-img') + ")";
        });

        append(containers[i].querySelector('.dropdown_select'), item);
      }
    }
    
    getPlayers();

    function findPlayers(input_value, dropdown_input){

      dropdown_select = dropdown_input.nextElementSibling.nextElementSibling;

      var items = dropdown_select.querySelectorAll('.dropdown_select_item');

      for (var j = 0; j < items.length; j++) {

        items[j].style.display = 'none';

        var string = items[j].innerText;

        if(input_value === undefined){
          items[j].style.display = 'block';
        }
        else{
          if(string.toLowerCase().startsWith(input_value.toLowerCase())){
            items[j].style.display = 'block';
          } 
        }
      }

      if(dropdown_select.classList.contains('top'))
        dropdown_select.classList.remove('top');

      var distance = dropdown_select.getBoundingClientRect();

      var bottom = document.documentElement.clientHeight - distance.top - dropdown_select.clientHeight;

      if( bottom < 0 ){
        dropdown_select.classList.add('top');
      }

    }
  }
}

var massiv = [
  {label: "Pele", id: 0, img: "http://i.ucrazy.ru/files/i/2011.5.28/1306590358_w_df9a28a7.jpg"},
  {label: "Diego Maradona", id: 1, img: "https://extbet.com/storage/s4/5ad56c1a4acce9bd7cf7a29bc0651bd4.jpg"},
  {label: "Ronaldo", id: 2, img: "https://kan-yu.com.ua/wp-content/uploads/2016/12/2016-1211-5.jpg"},
  {label: "Paolo Maldini", id: 3, img: "https://images.performgroup.com/di/library/GOAL_INTERNATIONAL/22/c0/paolo-maldini_15ksgw5nb9jh1k5vubcn1d7r6.jpg?t=1854795814&w=940"},
  {label: "Lev Yashin", id: 4, img: "http://user.vse42.ru/files/P_S1280x858q80/Wnone/ui-5af52183b14e39.90470468.jpeg"},
  {label: "Ronaldinho", id: 5, img: "https://i.ytimg.com/vi/54WLtYBfIzI/maxresdefault.jpg"},
  {label: "Cristiano Ronaldo", id: 6, img: "https://pbs.twimg.com/media/DlyX3THUYAAUqNp.jpg"},
  {label: "Lionel Messi", id: 7, img: "https://www.larepublicaesportiva.cat/wp-content/uploads/2018/10/636728960827927217.jpg"},
  {label: "Johan Cruyff", id: 8, img: "http://www.varzesh11.com/images/gallery/johan-cruyff-55318.jpg"},
  {label: "Marco van Basten", id: 9, img: "https://warchitecturedotorg.files.wordpress.com/2014/10/gullit-van-basten-holland-1988-wallpaper-hd.jpg?w=1200"},
  {label: "Lothar Matthaus", id: 10, img: "https://indobayern.files.wordpress.com/2016/02/lothar-matthaeus-thomas-strunz.jpg?w=1312"},
  {label: "George Best", id: 11, img: "https://gameofthepeople.files.wordpress.com/2017/03/george-best.jpg?w=1200"},
  {label: "Ruud Gullit", id: 12, img: "https://pbs.twimg.com/media/DpPMYg9XoAAAxhw.jpg"},
  {label: "Franco Baresi", id: 13, img: "http://interactive.museum.acmilan.com/uploads/objects/extras/5-en.1391191635_bz_1318240781.jpg"}
];

initDropdown(massiv);