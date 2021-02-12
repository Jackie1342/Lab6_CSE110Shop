// Script.js

window.addEventListener('DOMContentLoaded', () => {
  
  if(localStorage.getItem('0')===null){
    let res = fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      for (let key in data){
        localStorage.setItem(key,JSON.stringify(data[key]));
      }
    });
  }

  let length = localStorage.length;

  let list = [];
  if(localStorage.getItem('list')!=null){
    let l = localStorage.getItem('list');
    length = length-1;
    list = l.split(',');
    document.getElementById('cart-count').textContent = list.length.toString();
  }

  let product_list = document.getElementById("product-list");

  for(let i=0;i<length;i++){
    let item = JSON.parse(localStorage.getItem(i));
    let product = document.createElement("product-item");
    product.src = item['image'];
    product.title = item['title'];
    product.price = item['price'];
    product.id = i.toString();
    if(list.indexOf(product.id)==-1){
      product.added = 0;
    }else{
      product.added = 1;
    }
    product_list.appendChild(product);
    addToCart(product,list);
  } 

});


function addToCart(elem,list) {
  const shadow = elem.shadowRoot;
  let button = shadow.querySelector('button');
  button.addEventListener('click',()=>{
    let count = parseInt(document.getElementById('cart-count').textContent);
    if(elem.added == 0){
      alert('Added to Cart!');
      list.push(elem.id);
      elem.added = 1;
      count = 1+count;
      document.getElementById('cart-count').textContent = count.toString();
      localStorage.setItem('list',list);
    }else if(elem.added == 1){
      alert("Removed from Cart!");
      let index = list.indexOf(elem.id);
      list.splice(index,1);
      elem.added = 0;
      count = count -1;
      document.getElementById('cart-count').textContent = count.toString();
      if(list.length==0){
        localStorage.removeItem('list');
      }else{
        localStorage.setItem('list',list);
      }
      
    }
  });
  
}
