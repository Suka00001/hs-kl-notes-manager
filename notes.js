async function getNotes() {
    return Promise.resolve(JSON.parse(localStorage.getItem("notes") || "[]"));
}

async function saveNotes(notes) {
    return Promise.resolve(localStorage.setItem("notes", JSON.stringify(notes)));
}

async function addNote() {
    const content = document.getElementById("noteInput").value.trim();
    if (!content) return;

    const notes = await getNotes();
    const newNote = {
        id: Date.now(),
        content,
        creationTime: new Date().toLocaleString()
    };
    notes.push(newNote);
    await saveNotes(notes);
    document.getElementById("noteInput").value = "";
    showNotes();
}

async function deleteNote(id) {
    const notes = await getNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    await saveNotes(updatedNotes);
    showNotes();
}

async function showNotes() {
    const notes = await getNotes();
    const container = document.getElementById("nodeContainer");
    container.innerHTML = "";

    if (notes.length === 0) {
        container.textContent = "There is no notes yet!";
        return;
    }

    const table = document.createElement("table");

    const header = table.insertRow();
    ["Date", "Content", "Action"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        header.appendChild(th);
    });

    notes.forEach(note => {
        const row = table.insertRow();

        row.insertCell().textContent = note.creationTime;
        row.insertCell().textContent = note.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteNote(note.id);
        const actionCell = row.insertCell();
        actionCell.appendChild(deleteBtn);
    });

    container.appendChild(table);
}

function init() {
    document.getElementById("addNoteBtn").addEventListener("click", addNote);
    showNotes();
}

window.addEventListener("DOMContentLoaded", init);
