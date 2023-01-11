// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the textArea in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


  start()
  function start(){
    currentTime = tellTime()
    currentHour = displayTime(currentTime)
    toDoList = retreiveWork()
    saveWork(toDoList)
  }

  function tellTime(){
    const currentTime = moment()
    return currentTime
  }

  function displayTime(currentTime){
    const currentDay = $('#currentDay')
    const currentHour = currentTime.format("H")
    currentDay.text(currentTime.format("MMMM Do YYYY"))
    return currentHour
  }

  function retreiveWork(){
    index = 0
    let toDoList = []
    var firstToDo = JSON.parse(localStorage.getItem("toDoList"));
    if (firstToDo === null){
      firstToDo = []
      toDoList=[
        {'hour': 'hour-8', 'text': ''},
        {'hour': 'hour-9', 'text': ''},
        {'hour': 'hour-10', 'text': ''},
        {'hour': 'hour-11', 'text': ''},
        {'hour': 'hour-12', 'text': ''},
        {'hour': 'hour-13', 'text': ''},
        {'hour': 'hour-14', 'text': ''},
        {'hour': 'hour-15', 'text': ''},
        {'hour': 'hour-16', 'text': ''},
        {'hour': 'hour-17', 'text': ''},
      ]
      
    } else {
      toDoList = firstToDo
    }

    toDoList.forEach(function(item, index){
      //Dynamically build HTML tags
      $('.container-lg').append('<div id="hour-8" class="row time-block"></div>')
      
      $(`#${item.hour}`).append('<div class="col-2 col-md-1 hour text-center py-3"></div>')
      if (index < 4){
        $(`#${item.hour}`).children('.hour').append(`${index+8}AM`)
      } else {
        $(`#${item.hour}`).children('.hour').append(`${index+8}PM`)
      }
      
      $(`#${item.hour}`).append('<textarea class="col-8 col-md-10 textArea" rows="3"></textarea>')
      //Add Text
        // firstToDo[index].text //This is the text I want to add
        // $(`#${item.hour}`).children('.textArea') // This targets the text area
        // $('.john').append('Philly') //This is  how I add the text
      $(`#${item.hour}`).children('.textArea').append(firstToDo[index].text)

      $(`#${item.hour}`).append('<button class="btn saveBtn col-2 col-md-1" aria-label="save">')

      $(`#${item.hour}`).children('.saveBtn').append('<i class="fas fa-save" aria-hidden="true"></i>')

    })
    return toDoList

  }

  function saveWork(toDoList){
    const saveButton = $(`.saveBtn`)
    saveButton.on('click', function(){
      //Determine the index of the time whos save button was pressed
      index = (toDoList.findIndex(id => id.hour === $(this).parents().attr('id'))) 
      //Saves the user text into the correct object
      toDoList[index].text = $(this).siblings('.textArea').val()
      //Submit string into local storage
      localStorage.setItem("toDoList", JSON.stringify(toDoList))
    })
  }



});


/* 
<div id="hour-11" class="row time-block future">
  <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
  <textarea class="col-8 col-md-10 textArea" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div> 
*/
