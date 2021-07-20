
window.addEventListener('load', function(e){
    var body =document.querySelector('body');
    var row = document.querySelector('#row');

    let formNewProduct = document.querySelector("#formNewProduct");


    let formNewProductNameInput = document.getElementById("name");
    let formNewProductDescriptionInput = document.getElementById("description")
    let formNewProductPriceInput = document.getElementById("price");
    let modal = document.getElementById("newProductModal");




    $(document).on('click', '.delete', function (evt) {
        console.log($(this).attr("id"));
        var id = ($(this).attr("id"));
        deleteProduct(id);
        evt.preventDefault();
    });

    formNewProduct.addEventListener("submit", function name(ev) {
    ev.preventDefault()
    let url = 'http://localhost:3000/api/newProduct';
    let image = document.getElementById('image');

    var formData = new FormData();
    formData.append("name", formNewProductNameInput.value);
    formData.append("description", formNewProductDescriptionInput.value);
    formData.append("price", formNewProductPriceInput.value);
    formData.append("image", image.files[0]);
    fetch(url, {
        method: "POST",
        body: formData,
        })
        .then(response => response.json())
            .then(response => {
                if(response.meta.state == 'OK'){  
                    getProducts();
                    $("#newProductModal").modal('hide');
                }
        }).catch(error => console.log(error))
        })
        getProducts();

    formEditProduct.addEventListener("submit", function name(ev) {
    ev.preventDefault()
    let url = 'http://localhost:3000/api/newProduct';
    let image = document.getElementById('image');

    var formData = new FormData();
    formData.append("name", formNewProductNameInput.value);
    formData.append("description", formNewProductDescriptionInput.value);
    formData.append("price", formNewProductPriceInput.value);
    formData.append("image", image.files[0]);
    fetch(url, {
        method: "POST",
        body: formData,
        })
        .then(response => response.json())
            .then(response => {
                if(response.meta.state == 'OK'){  
                    getProducts();
                }
        }).catch(error => console.log(error))
        })
        getProducts();    
})

    

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


function getProducts(){
    fetch('http://localhost:3000/api/products')
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        row.innerHTML = '';
        console.log(result);
        result.data.rows.forEach(product => {
            row.innerHTML += 
            '<div class="col-sm-3">' +
            '<div class="card" >' +
              '<img src="http://localhost:3000/static/img/products/'+ product.images[0].path +'" class="card-img-top" alt="'+ product.images[0].name+'">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + product.name + '</h5>' +
                '<h5 class="card-title"> $ ' + toThousand(product.price) + '</h5>' +
                '<p class="card-text">' + product.description + '</p>' +
                '<a href="#" id="'+ product.id_product + '" class="btn btn-primary detail">Detail</a>' +
                '<a href="#" id="'+ product.id_product + '" class="btn btn-warning edit">Edit</a>' +
                '<a href="#" id="'+ product.id_product + '" class="btn btn-danger delete">Delete</a>' +

                '</div>' +
              '</div>' +
              '</div>'
        })

})
    .catch(function(error){
        console.log(error);
    })
}

function deleteProduct(id){
    fetch('http://localhost:3000/api/delete/'+id)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);
    if(result.meta. state == "OK"){
        getProducts();
    }
        })
    .catch(function(error){
        console.log(error);
    })
}

function productDetail(id){
    fetch('http://localhost:3000/api/product/'+id)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);
    if(result.meta. state == "OK"){
       console.log(result)
    }
        })
    .catch(function(error){
        console.log(error);
    })
}

function deleteImage(idImage){
    fetch('http://localhost:3000/api/product/'+idImage)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);
    if(result.meta. state == "OK"){
       console.log(result)
    }
        })
    .catch(function(error){
        console.log(error);
    })
}



/*window.fetch("http://localhost:3000/api/users", {
    method: 'POST',
    body: JSON.stringify(this.state),
    headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
        .then(response=>{
            console.log(response);
            this.setState({
                message : response.meta.message,
                user : response.meta.state!=null?response.data.email:"",
                isLog:response.meta.state,
                userId: response.meta.state!=null?response.data.id:""
            })
        })
        .catch(error => console.error('Error:', error))
        .then(() => console.log('Success:', this.state));
      }}*/