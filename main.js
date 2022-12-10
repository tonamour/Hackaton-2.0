

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