import React from 'react';
import '../style/style.sass';
import logo_krest from '../img/krest.png'
import arrow_up from '../img/arrow_up.svg'
import arrow_down from '../img/arrow_down.svg'
import $ from 'jquery';
import startTicking from './time/timer';
import logClockTime from './'
import setTime from './time/timer';
import access_list from '../img/access_list.svg'
import delete_list from '../img/delete_list.svg'
import list_noname from '../img/list_noname.svg'
import list_priority from '../img/list_priority.svg'
import list_defer from '../img/list_defer.svg'
import ToDoList from './ToDoList'
import CaseSettings from './CaseSettings';
import {connect} from "react-redux"
import Options from './Options';

let dragObject = {};
let toDoListDo = 0;
let FixedList = 0;
let Fixed = [];

let inputText = ''

let list 

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
    this.deleteList = this.deleteList.bind(this)
    this.select_priority = this.select_priority.bind(this)
    this.access_list = this.access_list.bind(this)
    this.task_click = this.task_click.bind(this)
    this.sort = this.sort.bind(this)
    this.props.arrayToDo
    this.props.toDoList

   
    this.props.OptionsNumber
    this.props.Sort_list
    this.substask_text = ''
    this.note_text = ''
    
    // this.createToDo = this.createToDo.bind(this)
  }

  task_click(event) {
    let item = event.target
    let this_item = item.parentNode
    let key = item.getAttribute('key7')
    let day = item.parentNode.childNodes[1].value
    let priority
    if (day > 0) {
      priority = 4
    }
    else {
      priority = 2
    }
    this.props.setPriority(priority, key, day)
    item.parentNode.childNodes[1].value = ''
    this_item.style.display = (this_item.style.display == 'block') ? this_item.style.display = 'none' : this_item.style.display = 'block'
  }

  access_list(event) {
    let key = event.target.getAttribute('key5')
    event.stopPropagation()
    this.props.accept_list(key)

  }

  select_priority(event) {
    let item = event.target
    let key = event.target.parentNode.getAttribute('key4')
    if (item.textContent == 'Задать высокий приоритет') {
      this.props.setPriority(1, key)
    }
    else if (item.textContent == 'Задать средний приоритет') {
      this.props.setPriority(2, key)
    }
    else if (item.textContent == 'Задать низкий приоритет') {
      this.props.setPriority(3, key)
    }
    item.parentNode.parentNode.style.display = 'none'
    event.stopPropagation()
  }

 

  textarea_note(event) {
    let min_line_count = 2
    let line_height = 15
    console.log(event.target.scrollTop)
    if (event.target.scrollTop > 0) {
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

  changeText(event) {
    this.substask_text = event.target.value
    console.log(this.substask_text)
  }

  add_note() {
    if (this.note_text.length > 0) {
      let time = logClockTime() + ''
      let text_area = document.getElementById('text_area')
      text_area.value = ''
      this.props.changeNote(this.props.OptionsNumber, this.note_text, time)
      this.note_text = ''

    }
  }
  inputNote(event) {

    this.note_text = event.target.value
    console.log(this.note_text)
  }

  add_subtask() {
    if (this.substask_text.length > 0) {
      let time = new Date()
      let input_subtasks = document.getElementById('input_subtasks')
      let down_div = document.getElementById('down_div')
      down_div.classList.toggle('hidden');
      input_subtasks.value = ''
      this.props.changeSubtasks(this.props.OptionsNumber, this.substask_text, time)
      this.substask_text = ''
    }
  }

  inputSubtask() {
    let down_div = document.getElementById('down_div')
    down_div.classList.remove('hidden');
    // menu_down.style.marginBottom = '20px'
  }

  select_type(event) {
    this.props.changeType(this.props.OptionsNumber, event.target.textContent, event.target.parentNode.id)
  }

  changeName(e) {
    // console.log(e.target.value, event.target.getAttribute('key3'))
    this.props.changeNameDo(event.target.getAttribute('key3'), e.target.value)
  }



  showOptions(e) {
    this.props.openOptions(e.target.closest('LI').getAttribute('key2'))

  }

  closeDO(e) {
    this.props.onClickDoDelete(e.target.getAttribute('key1'))

  }

  fixState() {
    const toDoList = this.props.toDoList;
    if (FixedList < toDoList) {
      this.props.onClickDoDelete();
      // console.log(FixedList);
    }
  }




  componentDidMount() {
    // let down_div = document.getElementById('down_div')
    // down_div.classList.add('hidden');
    // $('.dropdown').click(function () {
    //   $(this).attr('tabindex', 1).focus();
    //   $(this).toggleClass('active');
    //   $(this).find('.dropdown-menu').slideToggle(300);
    // });
    // $('.dropdown').focusout(function () {
    //   $(this).removeClass('active');
    //   $(this).find('.dropdown-menu').slideUp(300);
    // });
    // $('.dropdown .dropdown-menu li').click(function () {
    //   $(this).parents('.dropdown').find('span').text($(this).text());
    //   $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    // });
    /*End Dropdown Menu*/


    // $('.dropdown-menu li').click(function () {
    // var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
    //   msg = '<span class="msg">Hidden input value: ';
    // $('.msg').html(msg + input + '</span>');
    // });
  }


  componentDidUpdate() {
    const toDoList = this.props.toDoList;
    // console.log('toDoList:' + toDoList);
    toDoListDo += 1;
    for (let i = 0; i < Fixed.length; i++) {
      if (toDoList == i && Fixed[i] == false) {
        Fixed[i] = true;
        createDo();
        // console.log('Do:'+toDoListDo);
        if (toDoList < toDoListDo) {
          Fixed[i] = false;
        }
      }
    };



    function createDo() {
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
      button1.onclick = function (e) {
        const qw = e.target.parentNode;
        toDoListDo += 1;
        FixedList -= 1;
        // try{
        // document.body.removeChild(qw.parentNode);
        // }
        // catch{
        //   coordinates.removeChild(qw.parentNode);
        // }
      }
    }
  }




  showDo(event) {
    let visibleToDo = document.getElementById('visibleToDo')
    let div_visible = event.currentTarget
    let parentItem = div_visible.childNodes[0].lastChild // картинка стрелки
    let this_item = div_visible.parentNode.childNodes[1]
    parentItem.src = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? parentItem.src = arrow_down : parentItem.src = arrow_up
    this_item.style.display = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? this_item.style.display = 'none' : this_item.style.display = 'flex'
    // this.item.childNodes[0].style.display = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? this_item.style.display = 'none': this_item.style.display = 'block'
    // this.item.childNodes[0].style.display = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? this_item.style.display = 'none': this_item.style.display = 'block'
    // console.log(this_item)

    // parentItem.src = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? parentItem.src = arrow_down : parentItem.src = arrow_up
    // this_item.style.display = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? this_item.style.display = 'none': this_item.style.display = 'block'

  }

  deleteList(event) {
    event.stopPropagation()
    this.props.deleteToDo(event.target.getAttribute('key6'))


  }
  sort(){
    if(this.props.type_sort == 2){
      let newSortArray = [... this.props.colors]
      return newSortArray.sort((a,b) => a.priority - b.priority)
    }
    else if(this.props.type_sort == 1){
      return this.props.colors
    }
    
  }

  render() {
    const Sort_list = this.props.Sort_list
    let arrayToDo = this.props.colors

    // if (this.props.sort == 2) {
    //   arrayToDo = arrayToDo.sort((a, b) => a.priority - b.priority)
    // }

    const toDoList = this.props.toDoList
    const number = this.props.number
    let arraySort = this.sort()
    

    console.log('111', arraySort)
    // const array_subtask = arrayToDo[number].subtasks
    // const array_notes = arrayToDo[number].notes
    
    return (
      <div className='mainWindow' id='coordinates'>
        {/* <ToDoList arrayToDo={arrayToDo} array_subtask={array_subtask} array_notes={array_notes} OptionsNumber={OptionsNumber} /> */}
        <ToDoList
          array = {arraySort}
          openOptions = {this.props.openOptions}
         
        />
        <Options
          array = {arraySort}
          
        />
        {/* <div className='options'>
          <div className='name_todo'>{(arrayToDo.length > 0) ? arrayToDo[number].name_todo : 'У вас нету дела'}</div>
          <div className='options_div'>
            <div className='block_term'>
              <div id='type_ToDo'> <span>тип:</span>
                <div className="container">

                  <div className="dropdown">
                    <div className="select">
                      <span id='select_type'>{(arrayToDo.length > 0) ? arrayToDo[number].type : 'Выберите тип '}</span>
                      <i className="fa fa-chevron-left"></i>
                    </div>
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
                      <span >{(arrayToDo.length > 0) ? arrayToDo[number].term : 'Выберите срок'}</span>
                      <i className="fa fa-chevron-left"></i>
                    </div>
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
                      <span id='select_type'>{(arrayToDo.length > 0) ? arrayToDo[number].duration : 'Выберите продолжительность'}</span>
                      <i className="fa fa-chevron-left"></i>
                    </div>
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
                    name="text" onKeyUp={this.textarea_note} onChange={this.inputNote} placeholder="Введите ваше сообщение"></textarea>
                  <div id="text_area_div"></div>
                </div>
                <button id='button' className='button' onClick={this.add_note} >Отправить</button>
                <div id='div_note'>
                  <ul className='ul_note_item'>
                    {(arrayToDo[number].haveNote) ? array_notes.map((elem, key) => <li key={key} id='note_item' ><div>{elem.text}</div><span id=''>{elem.time_note}</span></li>) : ''}
                  </ul>
                </div>

              </div>
              <div className='subtasks_div'><div className='name_subtasks'>Подзадачи</div>
                <input placeholder='Какое дело?' onClick={this.inputSubtask} onChange={this.changeText} autoComplete='off' required id='input_subtasks'></input>
                <div id='menu_down'>
                  <div id='down_div'>
                    <div id='col_left'><br /></div>
                    <button id='button' className='button' onClick={this.add_subtask} >Отправить</button>
                  </div>
                </div>
                <div >
                  <ul className='ul_subtask_item'>
                    {(arrayToDo[number].haveSubtask) ? array_subtask.map((elem, key) => <li key={key} id='subtask_item' >{elem.text}<span>{elem.time}</span></li>) : ''}
                  </ul>
                </div>


              </div>

            </div>
          </div>
        </div> */}
      </div>
    );
  }

}

function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    number: state.select_case,
    type_sort: state.sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCase: elemToDo => dispatch(add_case(elemToDo)),
    selectedCase: numberCase => dispatch(selected_case(numberCase))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Windows);