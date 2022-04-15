let keyword = document.querySelector("#search_input");
let search_button = document.querySelector("#search_button");
let list = document.querySelector('.list');

async function getapi(url){
    const response = await fetch(url);
    
    let data = response.json();
    if(response.status === 200){
        return await data;
    }
}

function short(long){
    return long.substring(0, 250).concat('...');
}

function setData(info){
    if(!info || info.totalItems === 0) return '404';

    return books = info.items.map(book =>{
        let new_book = {};
        let b = book.volumeInfo    

        new_book.title = b.title;
        new_book.publisher =  b.publisher === undefined ? 'Cannot Get the Data' : b.publisher;
        new_book.description = b.description === undefined ? 'Please, Click the detail button' : short(b.description);
        new_book.image = b.imageLinks === undefined || '' ? 'https://books.google.com/books/content?id=u1bUDwAAQ%E2%80%A6=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' : `https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w240-h480`;
        new_book.previewLink = b.previewLink;
        new_book.infoLink = b.infoLink;

        return new_book;
    })
}

function displayList(books){
    let cards = '';
    if(books === '404') {
        list.innerHTML = `<div class="text-center"> No releated data exitst for the Keyword 😭 </div>`;
        return
    }
    
    books.forEach(book => {
        cards += `
        <div class="card col-sm-6 col-md-4 col-lg-3">
            <img src=${book.image} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Publisher : ${book.publisher}</p>
                <p class="card-text">${book.description}</p>
                <a href=${book.infoLink} class="btn btn-primary">More Details...</a>
            </div>
        </div>
        `
    })
    list.innerHTML = cards;
}

function setErrorMsg(e){
    let errorMsg = `
    <div class="text-center">
        Please, Let the developer know the error below : <br/>
        ${e}
    </div>`;
    list.innerHTML = errorMsg;
}

search_button.addEventListener('click', function(){
    let url = `https://www.googleapis.com/books/v1/volumes?q=${keyword.value}`;
    let data = getapi(url)

    data
        .then(d => {
            let clearData = setData(d);
            displayList(clearData);
        })
        .catch(e =>{
            setErrorMsg(e)
        })
})