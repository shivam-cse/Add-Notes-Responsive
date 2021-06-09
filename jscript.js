console.log("Notes add project");
showNotes();

//Add Notes when user want to add by button add note

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
     
    notesObj.push(addTxt.value);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})


//Function to show elements 
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
        <div class="col-sm my-2 mx-2">
        <div class="card noteCard" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Your Note ${index + 1}</h5>
                <hr class="bg-dark">
                <p class="card-text">${element}</p>
                <button onclick="deleteNotes(this.id);" class="btn btn-primary" id = "${index}">Delete Note</button>
            </div>
        </div>
    </div> `
    });
    
    let myNotes = document.getElementById('notes');

    if(notesObj.length != 0){
        myNotes.innerHTML = html;
    }
    else{
        myNotes.innerHTML = `<h3 class = "text-warning mx-auto" style = "text-align:center;">Nothing to show here , please add your notes!</h3>`
    }

}

//Function to delete


function deleteNotes(index){
    // console.log(index);
    let isDelete = confirm("Do you want to delete ? You can't get data after deleting it.");
    if(isDelete){
    let notes = localStorage.getItem("notes");
    // console.log("Yes" + notes);
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
}
    showNotes();

}

let search = document.getElementById('searchTxt');
// let search = document.getElementById('searchBtn');
search.addEventListener("input", function(){
    let inputvalue = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // let cardTxt = element.children[0].getElementsByTagName('p')[0].innerText;

        if(cardTxt.includes(inputvalue)){
            // element.style.display = "block";
            element.parentElement.style.display = "block";
        }
        else
        element.parentElement.style.display = "none";
    })

    
})