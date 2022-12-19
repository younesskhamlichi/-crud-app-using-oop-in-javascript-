const form = document.getElementById("produit-form");
const nom = document.getElementById("nom");
const marque = document.getElementById("marque");
const prix = document.getElementById("prix");
const date = document.getElementById("date");
const sel = document.getElementById("sel");
const promo = document.querySelector("form").elements.namedItem("promo");
const table = document.querySelector("#table tbody");
const submit = document.getElementById("submit");
const editBtn = document.getElementById("editBtn");
           

class Article{

    constructor(id,nom,marque,prix,date,sel,promo){
        this.id = id;
        this.nom = nom;
        this.marque = marque;
        this.prix = prix;
        this.date = date;
        this.sel = sel;
        this.promo = promo;
       
    }
    showData(){
        Article.showHTML(this.id,this.nom,this.marque,this.prix,this.date,this.sel,this.promo)
        return this;
    }
    storeProduct(){
        const allData = JSON.parse(localStorage.getItem("product")) ?? [] ;
        allData.push({id:this.id,nom:this.nom,marque:this.marque,prix:this.prix,date:this.date,sel:this.sel,promo:this.promo});
        // allData.sort((a,b) => a.nom.localCompare(b.nom));
        localStorage.setItem("product",JSON.stringify(allData))
    }

    static showAllProduct(){
        if(localStorage.getItem("product")){
            JSON.parse(localStorage.getItem("product")).forEach((item)=>{
            Article.showHTML(item.id,item.nom,item.marque,item.prix,item.date,item.sel,item.promo)
        })
        
        }
    }
// update product
    updateProduct(id){
        const newItem = {id:id,nom:this.nom,marque:this.marque,prix:this.prix,date:this.date,sel:this.sel,promo:this.promo};
        const updateData = JSON.parse(localStorage.getItem("product")).map((item) => 
        {
            if(item.id == id){
                return newItem;
            }
            return item;
        })
        localStorage.setItem("product",JSON.stringify(updateData));
    }

    static showHTML(id,nom,marque,prix,date,sel,promo){
        const trPr = document.createElement('tr');
        trPr.innerHTML = `
        <tr>
            <td>${nom}</td>
            <td>${marque}</td>
            <td>${prix} DH</td>
            <td>${date}</td>
            <td>${sel}</td>
            <td>${promo}</td>
            <td>
                <button class="btn btn-warning btn-sm edit" data-id="${id}">Edit</button>
                <button class="btn btn-danger btn-sm delete" data-id="${id}">Delete</button>
            </td>
        </tr>
        `
        table.appendChild(trPr);
    }
}

Article.showAllProduct();

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    if(!editBtn.value){
        let id = Math.floor(Math.random() * 1000000);

        const newPr = new Article(id,nom.value,marque.value,prix.value,date.value,sel.value,promo.value);
        newPr.showData().storeProduct();

    }else{
        const id = editBtn.value;
        const newPr = new Article(id,nom.value,marque.value,prix.value,date.value,sel.value,promo.value)
        newPr.updateProduct(id);
        submit.value="store this data";
        table.innerHTML= '';
        Article.showAllProduct();
    }
    nom.value = '';
    marque.value = '';
    prix.value = '';
    date.value = '';
    sel.value = '';
    promo.value = '';

    // window.location.reload();
})

// delete data

table.addEventListener("click",(e)=> {
    
    if(e.target.classList.contains("delete")){

        // remove from localStorage
        const id = e.target.getAttribute("data-id");
        const del = JSON.parse(localStorage.getItem("product"));
        const newData = del.filter(item => item.id != id);
        localStorage.setItem("product",JSON.stringify(newData))

        // remove from html
        e.target.parentElement.parentElement.remove();
    }

    if(e.target.classList.contains("edit")){

        // remove from localStorage
        const id = e.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem("product")).find(item => item.id == id);
        nom.value = item.nom;
        marque.value = item.marque;
        prix.value = item.prix;
        date.value = item.date;
        sel.value = item.sel;
        promo.value = item.promo;
        editBtn.value = id;
        submit.value = "edit this product";
    }
})