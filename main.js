const API = "http://localhost:8001/users"

let name = document.querySelector('#name')
let surname = document.querySelector('#surname')
let number = document.querySelector('#email')
let image = document.querySelector('#image')
let btnAdd = document.querySelector('#btn-add1')

let list = document.querySelector('#users-list')

let editName = document.querySelector('#edit-name')
let editSurname = document.querySelector('#edit-surname')
let editEmail = document.querySelector('#edit-email')
let editImage = document.querySelector('#edit-image')
let editSaveBtn = document.querySelector('#btn-save-edit')
let exampleModal = document.querySelector('#exampleModal')
let body1 = document.querySelectorAll('body')
let btnClose = document.querySelector('.btn-close')


let searchInp = document.querySelector('#search');
let searchVal = '';
let currentPage = 1;






// console.log(name,surname,number);

btnAdd.addEventListener('click', async function(){
    let obj = {
        name:name.value,
        surname:surname.value,
        email:email.value,
        image:image.value
    };
    if(!obj.name.trim() || !obj.surname.trim() || !obj.email.trim() || !obj.image.trim() ){
        alert('Заполните поля')
        return
    }

  await fetch(API, {
    method:'POST',
    headers: {
        'Content-Type' : 'application/json; charset=utf-8'
    },
    body: JSON.stringify(obj),
  });
  render()

  name.value = ''
  surname.value = ''
  email.value = ''
  image.value = ''

});

render()
async function render() {
    let users = await fetch(`${API}?q=${searchVal}&_page=${currentPage}&_limit=4`)
    .then((res)=> res.json()).catch((err) => console.log(err));
list.innerHTML = '';
users.forEach((elem)=> {
    let newElem = document.createElement('div')
    newElem.id = elem.id
    
    newElem.innerHTML = `
    <div class="card">
      <img src=${elem.image} class="card-img" alt="...">
      <div class="card-body">
        <h3 class="card-title">${elem.name}</h3>
        <h3 class="card-title">${elem.surname}</h3>
        <p class="card-text">${elem.email}</p>
    
    
        <a href="#" class=" btn-delete" id=${elem.id}>DELETE</a>
        <a href="#" class="btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal " id=${elem.id}>EDIT</a>
      </div>
    </div>
        `;
    
    
    
        list.append(newElem)





});


}


document.addEventListener('click' , function(e){
    if(e.target.classList.contains('btn-edit')){
        let id = e.target.id
        fetch(`${API}/${id}`).then((res)=> res.json()).then((data)=> {
            editName.value = data.name,
            editSurname.value = data.surname,
            editEmail.value = data.email,
            editImage.value = data.image



            editSaveBtn.setAttribute('id',data.id)
        })
    }
})

editSaveBtn.addEventListener('click' , function(){

    let id = this.id

    let name = editName.value
    let surname = editSurname.value
    let email = editEmail.value
    let image = editImage.value

    if(!name || !surname || !email || !image) return;
    

    let editedUsers = {
        name:name,
        surname:surname,
        email:email,
        image:image
    };
    saveEdit(editedUsers , id)
})


function saveEdit(editedUsers,id){
    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json ; charset=utf-8'
        },
        body: JSON.stringify(editedUsers)
    }).then(()=> render())


exampleModal.style.display = "none"
    
}

btnClose.addEventListener('click' , ()=> {
    exampleModal.style.display = "none"
})




document.addEventListener('click' , (e)=> {
    if(e.target.classList.contains("btn-delete")){
       let id = e.target.id
       fetch(`${API}/${id}`, {
        method:'DELETE'
       }).then(() => render())
    }
})

document.addEventListener('click' , function(e){
        if(e.target.classList.contains('btn-edit')){
            let id = e.target.id
            fetch(`${API}/${id}`).then((res)=> res.json()).then((data)=> {
                editName.value = data.name,
                editSurname.value = data.surname,
                editEmail.value = data.email,
                editImage.value = data.image
    
    
    
                editSaveBtn.setAttribute('id',data.id)
                exampleModal.style.display = "block"
               
                
            })
        }
    })

    
    searchInp.addEventListener('input', ()=> {
        searchVal = searchInp.value;
        
        render() 
    })

    let nextPage = document.querySelector('#next-page');
    let prevPage = document.querySelector('#prev-page');

    async function checkPages() {
        let res = await fetch(API);
        let data = await res.json();
        let pages = Math.ceil(data.length / 4);
    
        if(currentPage === 1) {
            prevPage.style.display = 'none';
            nextPage.style.display = 'block';
        } else if (currentPage === pages) {
            prevPage.style.display = 'block';
            nextPage.style.display = 'none';
        } else {
            prevPage.style.display = 'block';
            nextPage.style.display = 'block';
        };
    };
    
    checkPages();
    
    prevPage.addEventListener('click', () => {
        currentPage--;
        render();
        checkPages();
    });
    
    nextPage.addEventListener('click', () => {
        currentPage++;
        render();
        checkPages();
    });
