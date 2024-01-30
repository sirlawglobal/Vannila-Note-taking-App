
const button = document.querySelector("button");
const motherContainer = document.querySelector(".mother-container");
const close = document.querySelector(".mother-container > span");
const form = document.querySelector("form");
const titleInput = document.querySelector(".title");
const textArea = document.querySelector("textarea");
const noteContainer = document.querySelector(".container");
const svgs = document.getElementsByTagName("svg");

//addressed the openning of modal pop up
button.onclick =function(){
  motherContainer.style.display = "block";
}

//addressed the closing of modal pop up
close.onclick = function(){
  motherContainer.style.display = "none";
}
//closing the modal container , if the outside of the form is clicked
window.onclick = function(event){
  if(event.target == motherContainer){
    motherContainer.style.display="none";
  }
}

function renderUi(){
    //clearing of the filled value after submisson from the input.
        noteContainer.innerHTML="";
        
          //looping through the array of the stickynote 
          stickyNote.forEach(
            
            function(note, index){
        
          // create a div and give it a classname
          const div = document.createElement("div");
          // div.className ="note-container";
          div.id = note.id;
        
        // create svg ::::its advisable to to createelementNS while working with svg.
        const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute("height", "34");
        svg.setAttribute("width","34");
        svg.setAttribute("viewBox", "0 -960 960 960" );
        
        const path = document.createElementNS("http://www.w3.org/2000/svg","path");
        
        path.setAttribute("d" , "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z");
        
        //append path to svg , then to div
        svg.appendChild(path);
        div.appendChild(svg);
        // create the second one

   
        const svg2 = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg2.setAttribute("height", "34");
        svg2.setAttribute("width","34");
        svg2.setAttribute("id","edit");
        svg2.setAttribute("viewBox", "0 -960 960 960");
        
        const path2 = document.createElementNS("http://www.w3.org/2000/svg","path");
        
        path2.setAttribute("d" , d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z");
        
        //append path to svg , then to div
        svg2.appendChild(path2);
        div.appendChild(svg2);
        
        //apply the backgroundcolor  to the div
          div.style.backgroundColor =note.theme;
        
        //create an H2 , give it a name and append it to the div.   
        const h2 = document.createElement("h2");
        h2.innerHTML=note.title;
        div.appendChild(h2);

        //create p tag , give it a class name and append it to the div
        const p = document.createElement("p");
        p.innerHTML = note.content;
        div.appendChild(p);


        // append the created div to the container 
        noteContainer.appendChild(div);
        
          });
        // display of the button after the submission  
        noteContainer.appendChild(button);
          
        }


//declaring the array of the sticky notes
let stickyNote =[];
// bringing the data from the local storage.
const existingNotes = localStorage.getItem("notes");

if(existingNotes){
  stickyNote = JSON.parse(existingNotes);
  renderUi();
}

//what should happen on submission
form.onsubmit = function(event){

  //to prevent the  reloading of the page once submitted.
  event.preventDefault();

  if(!titleInput.value || titleInput.value.trim().length <1 ){

    return alert("You need to add something")
  }

  const colorInput1 = document.querySelector('input[name="color"]:checked');

  //collection of value of the input
  const newNote = {
    id:new Date().getTime(),
    title: titleInput.value, 
    content:textArea.value,
    theme:colorInput1.value
  }
 
  
  // pushing of the value object into the array
stickyNote.push(newNote);
//emptying the mothercontainer after pushing
motherContainer.style.display ="none";
//setting the sticknote array into localstorage
localStorage.setItem("notes", JSON.stringify(stickyNote));
//updating the ui
renderUi();
//empting the newnotes value for the new input
titleInput.value ="";
textArea.value= "";

}

//this is for deleting the note
noteContainer.onclick = function(event){
//checking if what we clicked is svg icon
  if(event.target.tagName === "svg"){
    const otherNotes = stickyNote.filter(
      function(note){
      return note.id != event.target.parentElement.id;
    })

    stickyNote = otherNotes;
    localStorage.setItem("notes", JSON.stringify(stickyNote));
    renderUi();
  }
}



        