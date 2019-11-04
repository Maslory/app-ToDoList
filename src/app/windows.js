import React from 'react';
import '../style/style.sass';
import logo_krest from '../img/krest.png'
import arrow_up from '../img/arrow_up.svg'
import arrow_down from '../img/arrow_down.svg'
import $ from 'jquery';
import startTicking from './time/timer';
import logClockTime from './time/timer';
import setTime from './time/timer';

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
    this.select_type = this.select_type.bind(this)
    this.inputSubtask = this.inputSubtask.bind(this)
    this.add_subtask = this.add_subtask.bind(this)
    this.add_note = this.add_note.bind(this)
    this.inputNote = this.inputNote.bind(this)
    this.changeText = this.changeText.bind(this)
    this.textarea_note = this.textarea_note.bind(this)
    this.props.arrayToDo
    this.props.toDoList
    this.props.OptionsNumber
    this.substask_text = ''
    this.note_text = ''
    // this.createToDo = this.createToDo.bind(this)
  }

  textarea_note(event){
    let min_line_count = 2
    let line_height = 15
    console.log(event.target.scrollTop)
    if(event.target.scrollTop > 0){
      event.target.style.height = event.target.scrollHeight + "px";
    }
    let min_line_height = min_line_count * line_height;
  let obj = event.target;
  let div = document.getElementById(obj.id + '_div');
  div.innerHTML = obj.value;
  let obj_height = div.offsetHeight;
  if (event.keyCode == 13)
    obj_height += line_height;
  else if (obj_height < min_line_height)
    obj_height = min_line_height;
  obj.style.height = obj_height + 30 + 'px';
  }

changeText(event){
  this.substask_text = event.target.value
  console.log(this.substask_text)
}

add_note(){
  if(this.note_text.length > 0){
    let time = logClockTime() +''
    let text_area = document.getElementById('text_area') 
    text_area.value = ''
    this.props.changeNote(this.props.OptionsNumber, this.note_text, time)
    this.note_text = ''
    
  }
}
inputNote(event){

  this.note_text = event.target.value
  console.log(this.note_text)
}

add_subtask(){
  if(this.substask_text.length > 0){
    let time = new Date()
    let input_subtasks = document.getElementById('input_subtasks')
    let down_div = document.getElementById('down_div')  
    down_div.classList.toggle('hidden');
    input_subtasks.value = ''
    this.props.changeSubtasks(this.props.OptionsNumber, this.substask_text, time)
    this.substask_text = ''
  }
}

inputSubtask(){
  let down_div = document.getElementById('down_div')  
  down_div.classList.remove('hidden');
  // menu_down.style.marginBottom = '20px'
}

select_type(event){
    this.props.changeType(this.props.OptionsNumber, event.target.textContent,event.target.parentNode.id)
}

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
  
 


componentDidMount(){
  let down_div = document.getElementById('down_div')  
  down_div.classList.add('hidden');
  $('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/


// $('.dropdown-menu li').click(function () {
// var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
//   msg = '<span class="msg">Hidden input value: ';
// $('.msg').html(msg + input + '</span>');
// });
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




  showDo(event){
    let visibleToDo = document.getElementById('visibleToDo')
    let parentItem = event.target.closest('LI') //родительский элемент
    let this_item = parentItem.childNodes[1]
    
  }
  
  render(){
    const arrayToDo = this.props.arrayToDo
    const toDoList = this.props.toDoList
    const OptionsNumber = this.props.OptionsNumber
    const array_subtask = arrayToDo[OptionsNumber].subtasks
    const array_notes = arrayToDo[OptionsNumber].notes
    
 
    
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
        <div id='type_ToDo'> <span>тип:</span>
        <div className="container">
            
              <div className="dropdown">
                <div className="select">
                  <span id='select_type'>{(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].type: 'Выберите тип '}</span>
                  <i className="fa fa-chevron-left"></i>
                </div>
                {/* <input type="hidden" name="gender"></input> */}
                <ul className="dropdown-menu" id='type' onClick={this.select_type}>
                  <li  >Личное</li>
                  <li  >Работа</li>
                  <li >Дом</li>
                </ul>
              </div>
        </div>
         </div>
         <div id='type_ToDo'> <span>срок:</span>
        <div className="container">
              <div className="dropdown">
                <div className="select">
                  <span >{(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].term : 'Выберите срок'}</span>
                  <i className="fa fa-chevron-left"></i>
                </div>
                {/* <input type="hidden" name="gender"></input> */}
                <ul className="dropdown-menu" id='term' onClick={this.select_type}>
                  <li >Сегодня</li>
                  <li >Завтра</li>
                  <li >Послезатра</li>
                  <li >3 дня</li>
                  <li >4 дня</li>
                  <li >5 дней</li>
                  <li >6 дней</li>
                  <li >7 дней</li>
                </ul>
              </div>
        </div>
         </div>
         <div id='type_ToDo'> <span>продолжительность:</span>
         <div className="container">
            
            <div className="dropdown">
              <div className="select">
                <span id='select_type'>{(arrayToDo.length > 0) ? arrayToDo[OptionsNumber].duration: 'Выберите продолжительность'}</span>
                <i className="fa fa-chevron-left"></i>
              </div>
              {/* <input type="hidden" name="gender"></input> */}
              <ul className="dropdown-menu" id='duration' onClick={this.select_type}>
                <li  >10 мин</li>
                <li  >20 мин</li>
                <li >30 мин</li>
                <li >40 мин</li>
                <li >50 мин</li>
                <li >60 мин</li>
              </ul>
            </div>
      </div>
        
        </div>
        <div className='block_notes'>
          <div>Заметки</div>
          
          <div className="contact-form__input-wrapper">
          <textarea id="text_area" rows="2" className="contact-form__input contact-form__text"
           name="text" onKeyUp={this.textarea_note} onChange={this.inputNote}  placeholder="Введите ваше сообщение"></textarea>
          <div id="text_area_div"></div>
          <div className="contact-form__error contact-form__error_text"></div>
          </div>
          <button id='button' className='button' onClick={this.add_note} >Отправить</button>
          <div id='div_note'>
          <ul className='ul_note_item'>
             {(arrayToDo[OptionsNumber].haveNote) ? array_notes.map((elem,key) => <li key={key} id='note_item' ><div>{elem.text}</div><span id=''>{elem.time_note}</span></li>) : ''}
           </ul>
          </div>
          
          </div>
        <div className='subtasks_div'><div className='name_subtasks'>Подзадачи</div> 
        <input placeholder='Какое дело?' onClick={this.inputSubtask} onChange={this.changeText} autoComplete='off'   required id='input_subtasks'></input>
          <div id='menu_down'>
            <div id='down_div'>
            <div id='col_left'><br/></div>
            <a id='add_subtasks' onClick={this.add_subtask} >Добавить <br/> подзадачу</a>
            </div>
          </div>
          <div >
            <ul className='ul_subtask_item'>
             {(arrayToDo[OptionsNumber].haveSubtask) ? array_subtask.map((elem,key) => <li key={key} id='subtask_item' >{elem.text}<span>{elem.time}</span></li>) : ''}
            </ul>
          </div>
           
           
        </div>
          
        </div>
        </div>
        </div>
        {}
    </div>
    );
  }
 
}

export default Windows;