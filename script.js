// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
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

  let toDoList=[{'hour-9':'Test'},{'hour-10':'Text'},{'hour-11':'Here'}]

  start()
  function start(){
    currentTime = tellTime()
    currentHour = displayTime(currentTime)
    // retreiveWork()
    saveWork()
  }

  function tellTime(){
    const currentTime = moment()
    return currentTime
  }

  function displayTime(currentTime){
    const currentDay = $('#currentDay')
    const currentHour = currentTime.format("h")
    currentDay.text(currentTime.format("MMMM Do YYYY"))
    currentDay.attr("whattup")
    return currentHour
  }

  function retreiveWork(){
    var toDoList = JSON.parse(localStorage.getItem("toDoList"));
  }

  function saveWork(){
    const saveButton = $(`.saveBtn`)
    saveButton.on('click', function(){
      console.log($(this).parents().attr('id'))
      // toDoList = findIndex($(this).parents())
      //.val() lets me get a value from a form field
      console.log(toDoList[2])
      console.log(toDoList.indexOf($(this).parents().attr('id')))
      // localStorage.setItem(JSON.stringify("toDoList"));
    })
  }






});


/* 
<div id="hour-11" class="row time-block future">
  <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div> 
*/
