
$(function () {

  start()

  function start(){
    currentTime = tellTime()
    currentHour = displayTime(currentTime)
    toDoList = retreiveWork(currentHour)
    saveWork(toDoList)
  }

  function tellTime(){
    const currentTime = moment()
    return currentTime
  }

  function displayTime(currentTime){
    const currentDay = $('#currentDay')
    const currentHour = parseInt(currentTime.format("H"))
    currentDay.text(currentTime.format("MMMM Do YYYY"))
    return currentHour
  }

  function retreiveWork(currentHour){
    index = 0
    // let toDoList = []
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    if (toDoList === null){
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
    }

    toDoList.forEach(function(item, index){
      //Dynamically build HTML tags
      //Create current hour div tag
      $('.container-lg').append(`<div id="${item.hour}" class="row time-block"></div>`)
      if (index+8 < currentHour){
        $(`#${item.hour}`).addClass(`past`)
      } else if (index+8 === currentHour) {
        $(`#${item.hour}`).addClass(`present`)
      } else {
        $(`#${item.hour}`).addClass(`future`)
      }

      //Create display time div tag
      $(`#${item.hour}`).append('<div class="col-2 col-md-1 hour text-center py-3"></div>')
      if (index < 4){
        $(`#${item.hour}`).children('.hour').append(`${index+8}AM`)
      } else if (index === 4){
        $(`#${item.hour}`).children('.hour').append(`12PM`)
      }
      else {
        $(`#${item.hour}`).children('.hour').append(`${index-4}PM`)
      }
      
      //Create text area tag
      $(`#${item.hour}`).append('<textarea class="col-8 col-md-10 textArea" rows="3"></textarea>')
      //Add Text
      $(`#${item.hour}`).children('.textArea').append(toDoList[index].text)
        // firstToDo[index].text //This is the text I want to add
        // $(`#${item.hour}`).children('.textArea') // This targets the text area
        // $('.john').append('Philly') //This is  how I add the text

      //Create button tag
      $(`#${item.hour}`).append('<button class="btn saveBtn col-2 col-md-1" aria-label="save">')

      //create i tag
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
