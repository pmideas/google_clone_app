//pagescroll

window.onscroll = scrollfunction;

function scrollfunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.querySelector(".navbar").style.top = "0";
	} else {
		document.querySelector(".navbar").style.top = "-5px";
	}
}

//note//

const btn = document.querySelector(".btn-color");

const container = document.querySelector(".container")

function updateLSdata() {
	const textArea = container.querySelectorAll("textarea");
	const notes = [];

	textArea.forEach((note) => {
		return notes.push(note.value);
	})

	localStorage.setItem("notes", JSON.stringify(notes))


}

const getNote = (text = '') => {
	console.log("clicked")

	var note = document.createElement("div");
	note.classList.add("note");

	var txt = `
<div class="group">
    <span id="edit"><i class="fa-solid fa-pen icon_edit"></i></span>
    <span id="remove"><i class="fa-solid fa-trash-can icon_rm"></i></span>
    </div>
    <div class="main ${text ? "" : "hidden"} "> </div>      
  <textarea class="dd ${text ? "hidden" : "" }"></textarea>
  `;

	note.insertAdjacentHTML("afterbegin", txt);


	//getting d reference
	const del = note.querySelector("#remove"); // edit div is inside the note .so, this is called getting d refe of doc(div(note)) 
	const edit = note.querySelector("#edit");
	const main = note.querySelector(".main");
	const textArea = note.querySelector("textarea")
	del.addEventListener("click", () => {
		note.remove();
		updateLSdata();
	}) // here just calling or defining function

	// toggle using edit button;
	textArea.value = text;
	main.innerHTML = text;


	edit.addEventListener("click", () => {
		textArea.classList.toggle("hidden"); // adding a class in elem
		main.classList.toggle("hidden"); // adding a class in elem
	})

	textArea.addEventListener("change", (event) => {
		const value = event.target.value;
		// console.log(value);
		main.innerHTML = value;
		updateLSdata();
	})
	container.appendChild(note)


}
// / getting data back from localStorage

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
	notes.forEach((note) => getNote(note));
}


btn.addEventListener("click", () => getNote());