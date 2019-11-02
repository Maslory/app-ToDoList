import React from 'react';
import '../style/style.sass';
import logo_krest from '../img/krest.png'
import arrow_up from '../img/arrow_up.svg'
import arrow_down from '../img/arrow_down.svg'

let dragObject = {};
let toDoListDo = 0;
let FixedList = 0;
let Fixed = [];

let inputText = ''

class Windows extends React.Component {
  constructor(props) {
    super(props);
    this.fixState = this.fixState.bind(this);
    this.closeDO = this.closeDO.bind(this)
    this.showDo = this.showDo.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.changeName = this.changeName.bind(this)
   

    this.props.arrayToDo
    this.props.toDoList
    this.props.OptionsNumber
    // this.createToDo = this.createToDo.bind(this)
  }

//  createDo(){
//    return(

//    )
//  }

changeName(e){
  console.log(e.target.value, event.target.getAttribute('key3') )
  this.props.changeNameDo(event.target.getAttribute('key3'),e.target.value)
}



showOptions(e){
  this.props.openOptions(e.target.closest('LI').getAttribute('key2'))
  
}

closeDO(e){
  this.props.onClickDoDelete(e.target.getAttribute('key1'))

}

  fixState(){
    
    const toDoList = this.props.toDoList;
    if(FixedList<toDoList){
      this.props.onClickDoDelete();
      // console.log(FixedList);
    }
  }
  
 
   
 componentDidUpdate(){
  
    
  
   const toDoList = this.props.toDoList;
   console.log('toDoList:'+toDoList);

  toDoListDo+=1;
for(let i = 0; i < Fixed.length; i++) {
    if(toDoList==i && Fixed[i]==false){
      Fixed[i]=true;
      createDo();
      // console.log('Do:'+toDoListDo);
      if(toDoList < toDoListDo){
        Fixed[i]=false;
      }    
  }
};
 
 
  
function createDo(){
    const coordinates = document.getElementById('coordinates');
    
   const button1 = document.createElement('button');
      // СОЗДАНИЕ ШАБЛОНА ЭЛЕМЕНТА ДЕЛ
    const div = document.createElement('div');
    div.className = 'windows';
    div.id = 'windows';
    div.style.position = 'absolute';
    const header = document.createElement('header');
    button1.id = 'closeWindow';
    button1.className = 'closeWindow';
    div.className = 'draggable';
    header.id = 'elementMove';
    // header.style.position = 'absolute';
    const input = document.createElement("textarea");
    // input.style.position = 'absolute';
    input.className = 'textBox';
    input.placeholder = 'Ну что... Какие дела?';
    // coordinates.appendChild(div);
    // div.appendChild(header);
    // header.appendChild(button1);
    // div.appendChild(input);

   FixedList = toDoList;
  button1.onclick = function(e){
    const qw = e.target.parentNode;
    toDoListDo +=1;
    FixedList-=1;
    // try{
    // document.body.removeChild(qw.parentNode);
    // }
    // catch{
    //   coordinates.removeChild(qw.parentNode);
    // }
  }
}
}



  



 


  // componentDidMount(){
  //   for(let i=1;i<9;i++){
  //     Fixed[i]=false;
  //   }
  //   document.onmousedown = function(e) {   // поставить coordinates

  //     if (e.which != 1) { // если клик правой кнопкой мыши
  //       return; // то он не запускает перенос
  //     }
    
  //     const elem = e.target.closest('.draggable');
  //     if (!elem) return; // не нашли, клик вне draggable-объекта
  //     // запомнить переносимый объект
  //     dragObject.elem = elem;
  
  //     // запомнить координаты, с которых начат перенос объекта
  //     dragObject.downX = e.pageX;
  //     dragObject.downY = e.pageY;
  //   }

  //   document.onmousemove = function(e) {
  //     if (!dragObject.elem) return; // элемент не зажат
    
  //     if ( !dragObject.avatar ) { // если перенос не начат...
    
  //       // посчитать дистанцию, на которую переместился курсор мыши
  //       const moveX = e.pageX - dragObject.downX;
  //       const moveY = e.pageY - dragObject.downY;
  //       if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
  //         return; // ничего не делать, мышь не передвинулась достаточно далеко
  //       }
    
  //       dragObject.avatar = createAvatar(e); // захватить элемент
  //       if (!dragObject.avatar) {
  //         dragObject = {}; // аватар создать не удалось, отмена переноса
  //         return; // возможно, нельзя захватить за эту часть элемента
  //       }
    
  //       // аватар создан успешно
  //       // создать вспомогательные свойства shiftX/shiftY
  //       const coords = getCoords(dragObject.avatar);
  //       dragObject.shiftX = dragObject.downX - coords.left;
  //       dragObject.shiftY = dragObject.downY - coords.top;
    
  //       startDrag(e); // отобразить начало переноса
  //     }
    
  //     // отобразить перенос объекта при каждом движении мыши
  //     dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
  //     dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
  //     return false;
  //   }

  //   function getCoords(elem) { // кроме IE8-
  //     var box = elem.getBoundingClientRect();
    
  //     return {
  //       top: box.top + window.pageYOffset,
  //       left: box.left + window.pageXOffset
  //     };
  //   }

  //   function startDrag(e) {
  //     var avatar = dragObject.avatar;
    
  //     document.body.appendChild(avatar);
  //     avatar.style.zIndex = 9999;
  //     avatar.style.position = 'absolute';
  //   }


  //   function createAvatar(e) {
  //     // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
  //     var avatar = dragObject.elem;
  //     var old = {
  //       parent: avatar.parentNode,
  //       nextSibling: avatar.nextSibling,
  //       position: avatar.position || '',
  //       left: avatar.left || '',
  //       top: avatar.top || '',
  //       zIndex: avatar.zIndex || ''
  //     };
  //     // функция для отмены переноса
  //     avatar.rollback = function() {
  //       old.parent.insertBefore(avatar, old.nextSibling);
  //       avatar.style.position = old.position;
  //       avatar.style.left = old.left;
  //       avatar.style.top = old.top;
  //       avatar.style.zIndex = old.zIndex
  //     };
    
  //     return avatar;
  //   }
  //   document.onmouseup = function(e) {
  //     // (1) обработать перенос, если он идет
  //     // if (dragObject.avatar) {
  //     //   finishDrag(e);
  //     // }
  //     if(dragObject.elem == undefined){
  //       return;
  //     }
      
  //     dragObject.elem.style.left = e.pageX - dragObject.shiftX + 'px';
  //     dragObject.elem.style.top = e.pageY - dragObject.shiftY + 'px';
    
  //     // window.style.top = elem1.style.top;
  //     // window.style.left = elem1.style.left;
  //     dragObject = {};
      
  // if (dragObject.elem == null) {
  //   // такое возможно, если курсор мыши "вылетел" за границу окна
  //   return null;
  // } 
  //     return dragObject.elem.closest('.droppable');
  //     // в конце mouseup перенос либо завершился, либо даже не начинался
  //     // (2) в любом случае очистим "состояние переноса" dragObject
  //     // dragObject = {};
  //   }
  // }

  showDo(event){
    let visibleToDo = document.getElementById('visibleToDo')
    let parentItem = event.target.closest('LI') //родительский элемент
    let this_item = parentItem.childNodes[1]

  }
  
  render(){
    const arrayToDo = this.props.arrayToDo
    const toDoList = this.props.toDoList
    const OptionsNumber = this.props.OptionsNumber
    
    return (
      <div  className='mainWindow'   id='coordinates'>
        <ul className='ul'>
          {/* <li className='li'>
          <a className="todo" ><span>1.</span>Это моё дело <img src={logo_krest}/></a>
            </li> */}
          {arrayToDo.map((elem, key) => <li className='li' key2={key} onClick={this.showOptions}><div >
          <a className="todo" ><span>{key + 1 + '. '}</span>
          {/* <span className='nameArray'>{elem.name_todo}</span> */}
          <input placeholder='Какое дело?' autoComplete='off' id='input_Do' key3={key} onChange={this.changeName} value={elem.name_todo} onKeyPress={this.enterInput}    required ></input><span></span>
          <img key1={key} onClick={this.showDo} src={arrow_down}/></a>
          {/* <img key1={key} onClick={this.closeDO} src={logo_krest}/></a> */}
            </div>
            <div id='visibleToDo' key={key}>
              <span>Подзадачи</span>
              <ul>
                {/* <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li> */}
              </ul>
            </div>
            </li>)}
        </ul>
        <div className='options'> 
        <div className='name_todo'>{(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].name_todo : 'У вас нету дела'}</div> 
        <div className='options_div'>
        <div className='block_term'>
        <span>тип:<select><option>Личное</option><option>Работа</option></select> {(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].type: ''}</span> <br/>
        <span>срок: <select><option>Сегодня</option><option>Завтра</option><option>Послезатра</option><option>3 дня</option></select>  {(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].term : ''} </span> <br/>
        <div className='span_last'>продолжительность:<select><option>10мин</option><option>20мин</option><option>30мин</option><option>60мин</option></select> {(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].duration: ''}   </div> 
         
        </div>
        <div className='subtasks_div'><div className='name_subtasks'>Подзадачи</div> 
        <input placeholder='Какое дело?' autoComplete='off'   required id='input_subtasks'></input>
              <ul className='subtasks'>
                <li>1</li>
              </ul>
              
              </div>
          <div className='name_subtasks'>
          <div>Заметки</div>
          <textarea></textarea>

          </div>
        </div>
        </div>
    </div>
    );
  }
 
}

export default Windows;