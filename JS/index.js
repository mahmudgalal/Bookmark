var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var submitButton = document.getElementById("submitButton");
var tableContent = document.getElementById("tableContent");
var deleteButton = document.getElementById("deleteButton");
var info = document.getElementById("info");
var close = document.getElementById("close");
dataArray = [];
if (localStorage.getItem("productContainer") !== null) {
    dataArray = JSON.parse(localStorage.getItem("productContainer"));
    displayData();
  }



submitButton.addEventListener("click" , function () { 
    var bookmark = {
        name: bookmarkNameInput.value,
        url : bookmarkUrlInput.value,
    };
   if(validationName() == true && validationUrl() == true){
    info.classList.add("d-none");
    dataArray.push(bookmark);
    localStorage.setItem("productContainer", JSON.stringify(dataArray));
    displayData();
    clearForm();
   }else{
    info.classList.remove("d-none");
   }
 })



 function displayData(){
     var data = "";
    for(var i = 0 ; i < dataArray.length ; i++){
        data += `
    <tr>
    <td>${i+1}</td>
    <td>${dataArray[i].name}</td>
   <td><button class="btn-visit px-3 py-1"> <a href="${dataArray[i].url}" target="_blank"><i class="fa-solid fa-eye pe-2"></i> Visit</a></button></td>
    <td><button class="btn-delete px-3 py-1" id="deleteButton" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
  </tr>
    `
    }
    tableContent.innerHTML = data;
}


function clearForm(){
    bookmarkNameInput.value = null;
    bookmarkUrlInput.value = null;
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkUrlInput.classList.remove("is-valid");
 }


function deleteItem(e){
    dataArray.splice(e , 1);
    localStorage.setItem("productContainer", JSON.stringify(dataArray));
    displayData();
 }


 close.addEventListener("click" , function(){
    info.classList.add("d-none");
 })



 bookmarkNameInput.addEventListener("input" , validationName)

function validationName(){
    var text = bookmarkNameInput.value;
    var regex = /^[a-z A-z]{3,}$/
    if(regex.test(text) == true){
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid");
        return true;
    }else{
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");
        return false;
    }
}


 bookmarkUrlInput.addEventListener("input" , validationUrl)

function validationUrl(){
    var text = bookmarkUrlInput.value;
    const regex = /^(https?:\/\/)[-.A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]$/;
    if(regex.test(text) == true){
        bookmarkUrlInput.classList.add("is-valid");
        bookmarkUrlInput.classList.remove("is-invalid");
        return true;
    }else{
        bookmarkUrlInput.classList.add("is-invalid");
        bookmarkUrlInput.classList.remove("is-valid");
        return false;
    }
}