const form= document.getElementById("film-form");
const titleElement= document.querySelector("#title");
const directorElement= document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardBody= document.querySelectorAll(".card-body")[1];
const clear= document.getElementById("clear-films");




//tüm eventleri yükleme 
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films= Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    })
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}

function addFilm(e){
    const title= titleElement.value;
    const director=directorElement.value;
    const url= urlElement.value;

    if(title=== "" || director===""|| url===""){
        UI.displayMessages("Tüm alanları doldurunuz","danger")

    }else{
        //yeni film 
       
        const newFilm= new Film(title,director,url);

        UI.addFilmToUI(newFilm);// arayüze film ekleme 
        Storage.addFilmToStorage(newFilm); // storage a filmi yükleme



        UI.displayMessages("Film başarıyla oluşturuldu", "success")

    }
    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("silme işlemi başarılı", "success")
    }
    
}
function clearAllFilms(){
    if(confirm("emin misiniz?")){
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
    }

}