let categoryArray = [];
let toDoArray = [];
var values =[];


class Todo {
    constructor(title,date,description,priority) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.priority = priority;
    }
}

class category {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }
}

document.getElementById("createCategory").addEventListener('click',addNewCategory);
document.getElementById("createNewTodo").addEventListener('click',createNewTodo);
//document.getElementById("showTodoList").addEventListener('click',createNewTodo);

let category1 = new category('Home');
let category2 = new category('Office');
let category3 = new category('Health chart');
categoryArray.push(category1);
categoryArray.push(category2);
updateValuesArray();
//categoryArray.push(category3);

let todo1 = new Todo('jay','24-01-1998','student developer','high');
let todo2 = new Todo('patel','20-02-2000','coding','high');
category1.todoList.push(todo1);
category2.todoList.push(todo2);
showAllCategory();

document.getElementById("generate").addEventListener('click',selectCategory);

function selectCategory() {
    document.getElementById('generate').disabled = true;
    document.getElementById("container").innerHTML = "";
   
    var select = document.createElement("select");
    select.name = "projectName";
    select.id = "projectNameId"
   
    for (const val of values) {
      var option = document.createElement("option");
      option.value = val;
      option.text =  val;
      select.appendChild(option);
    }
   
    var label = document.createElement("label");
    label.innerHTML = "Choose your Category: "
    label.htmlFor = "Category";
    document.getElementById("container").appendChild(label).appendChild(select);
  }

  function updateValuesArray(){
    values.length=0; 
    for(let i=0;i<categoryArray.length;i++) {
        values.push(categoryArray[i].title);
    }
  }


//open and close CATEGORY FORM
function newCategoryForm() {
    if(document.getElementById("categoryForm").style.display == "none") {
        document.getElementById("categoryForm").style.display = "block";
    } else {
        document.getElementById("categoryForm").style.display = "none";
    }

}

// adding NEW category
function addNewCategory() {
    let title = document.getElementById("categoryTitle").value; 
    let newCategory = new category(title);
    categoryArray.push(newCategory);
    showPerticularCategory(newCategory,categoryArray.length - 1);
    document.getElementById("categoryTitle").value = ""; 

    updateValuesArray();
    selectCategory();
}

//Show any category form Category LIST
function showPerticularCategory(newCategory,index) {
    document.getElementById("categoryData").innerHTML += `<tr><td><input type="button" id="${newCategory.title}" value="${newCategory.title}" class="categoryFormButtons" onClick="showTodoList(${newCategory.title})"></td><td>` +
    `<input type="button" id="delete" value="delete" class="categoryFormButtons" onClick="deletePerticularCategory(${index})"></td></tr>`;
}

//Showing all CATEGORIES
function showAllCategory() {
    document.getElementById("categoryData").innerHTML = "";
    for(let i=0;i < categoryArray.length;i++) {
        showPerticularCategory(categoryArray[i],i);
    }
}

//delete any CATEGORY
function deletePerticularCategory(index) {
    categoryArray.splice(index,1);
    showAllCategory();
    updateValuesArray();
    selectCategory();
}

//create NEW TODO
function createNewTodo() {

    let categoryTitle = document.getElementById("projectNameId").value; 
    let todoTitle = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("date").value;
    let priority="";

    if(document.getElementById("high").checked == true) {
        priority = "high";
    }
    if(document.getElementById("medium").checked == true) {
        priority = "medium";
    }
    if(document.getElementById("low").checked == true) {
        priority = "low";
    }

    let flag=0;

    let newTodo = new Todo(todoTitle,date,description,priority);
    for(let i=0;i<categoryArray.length;i++) {
        if(categoryArray[i].title == categoryTitle){
            categoryArray[i].todoList.push(newTodo);
            flag=1;
            break;
        }
    }
    if(flag==0){
        let newCategory = new category(categoryTitle);
        newCategory.todoList.push(newTodo);
        console.log(newCategory.todoList.length);
    }

    //document.getElementById('generate').disabled = false;
    showTodoList(document.getElementById("projectNameId"));
    console.log(document.getElementById("projectNameId"));

    emptyFileds();
}

function emptyFileds() {
    document.getElementById("projectNameId").value =""; 
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value ="";
    document.getElementById("high").checked = false;
    document.getElementById("medium").checked = false;
    document.getElementById("low").checked = false;


}

//show perticular todo
function showPerticularTodo(newTodoElement,index,title) {
    document.getElementById("todoListData").innerHTML += `<tr><td>` + newTodoElement.title + `</td><td>` +
    newTodoElement.date + `</td><td>` + newTodoElement.description + `</td><td>` + newTodoElement.priority + 
    `</td><td><input type="button" id="deleteTodo" class="categoryFormButtons" value="delete" onClick="deletePerticularTodo(${index},${title})"></td></tr>`;
}

//showing todo list of any category
function showTodoList(categoryTitle) {
    document.getElementById("todoListData").innerHTML = "";

    for(let i=0;i<categoryArray.length;i++) {
        if(categoryArray[i].title == categoryTitle.value){
            for(let j=0;j<categoryArray[i].todoList.length;j++) {
                showPerticularTodo(categoryArray[i].todoList[j], j, categoryArray[i].title);
            }
        }
    }
}

//delete any todo
function deletePerticularTodo(index,title) {    
    for(let i=0;i<categoryArray.length;i++) {
        if(categoryArray[i].title == title.value){
            console.log(index);
            categoryArray[i].todoList.splice(index,1);
            showTodoList(categoryArray[i].title);
            break;
        }
        
    }
}

