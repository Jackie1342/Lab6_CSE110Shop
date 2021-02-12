// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    super();
    let shadow = this.attachShadow({mode:'open'});
    shadow.innerHTML = `
    <li class="product">
      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
      <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
      <p id="price" class='price'>$109.95</p>
      <button>Add to Cart</button>
    </li>`

    let style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    shadow.appendChild(style);

  }

  static get observedAttributes(){
    return ['src','title','price','id','added'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    let shadow = this.shadowRoot;

    if(attrName == 'src'){
      shadow.querySelector('img').src = newVal;
    }else if(attrName == 'title'){
      shadow.querySelector('img').alt = newVal;
      shadow.querySelector('p').textContent = newVal;
    }else if(attrName == 'price'){
      shadow.getElementById('price').textContent = '$'+newVal;
    }else if(attrName == 'added'){
      let button = shadow.querySelector('button');
      if(newVal==0){
        button.textContent = "Add to Cart";
      }else{
        button.textContent = "Remove from Cart";
      }
    }

  }

  get src(){
    return this.getAttribute('scr');
  }

  set src(newVal){
    this.setAttribute('src',newVal);
  }

  get title(){
    return this.getAttribute('title');
  }

  set title(newVal){
    this.setAttribute('title',newVal);
  }
  
  get price(){
    return this.getAttribute('price');
  }

  set price(newVal){
    this.setAttribute('price',newVal);
  }

  get added(){
    return this.getAttribute('added');
  }

  set added(newVal){
    this.setAttribute('added',newVal);
  }

}

customElements.define('product-item', ProductItem);