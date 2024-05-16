const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
let isEditing = false; // Düzenleme durumunu kontrol etmek için değişken
let currentEditingItem = null; // Şu anda düzenlenen öğeyi saklamak için değişken

todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Formun varsayılan davranışını engeller
  const newTask = todoInput.value;

  if (newTask === "") {
    alert("Lütfen görev girin!");
    return;
  }

  if (isEditing) {
    // Düzenleme durumunda ise mevcut öğeyi güncelle
    currentEditingItem.querySelector("span").textContent = newTask;
    isEditing = false;
    currentEditingItem = null;
    todoInput.value = "";
  } else {
    // değilse yeni görev ekle
    addTask(newTask);
    todoInput.value = "";
  }
});

// görev ekleme fonksiyonu
function addTask(task) {
  // list item oluşturduk
  const listItem = document.createElement("li");

  // seçmek için görevin yanına checkbox ekler
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  listItem.appendChild(checkBox);

  // girilen görevin textini list item'a ekledik
  const taskText = document.createElement("span");
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const editButton = document.createElement("button");
  editButton.textContent = "Düzenle";
  editButton.className = "btn-edit";
  listItem.appendChild(editButton);

  // sil butonu oluşturduk
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Sil";
  deleteButton.className = "btn-delete";
  listItem.appendChild(deleteButton);

  // to-do list'e oluşturduğumuz görev item'ı ekliyoruz
  todoList.appendChild(listItem);

  // checkbox işaretliyse görev tamamlanır
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      taskText.style.textDecoration = "line-through";
      listItem.style.backgroundColor = "green";
    } else {
      taskText.style.textDecoration = "none";
      listItem.style.backgroundColor = "#f9f9f9";
    }
  });

  // görevi silme fonksiyonu
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(listItem);
  });

  // görev düzenleme fonksiyonu
  editButton.addEventListener("click", function () {
    todoInput.value = taskText.textContent; // Mevcut görev metnini giriş alanına yerleştir
    todoInput.focus(); // Giriş alanına odaklan
    isEditing = true; // Düzenleme modunu aktif hale getir
    currentEditingItem = listItem; // Düzenlenen öğeyi sakla
  });
}
