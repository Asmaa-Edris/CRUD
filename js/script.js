var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("saveBtn");
var updateBtn = document.getElementById("updateBtn");
var productContainer;
var currentIndex = 0;

if (localStorage.getItem("product") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("product"));
  displayProduct(productContainer);
}

// ---------------- Add Product ----------------
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productContainer.push(product);
  localStorage.setItem("product", JSON.stringify(productContainer));
  displayProduct(productContainer);
  clearForm();
}

// ---------------- Display ----------------
function displayProduct(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += `<tr>
      <td>${i + 1}</td>
      <td>${arr[i].name}</td>
      <td>${arr[i].category}</td>
      <td>${arr[i].price}</td>
      <td>${arr[i].desc}</td>
      <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-success btn-icon btn2"><i class="fa-solid fa-pen-to-square"></i></button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-icon btn1"><i class="fa-solid fa-trash-can "></i></button></td>
    </tr>`;
  }
  document.getElementById("productTable").innerHTML = cartona;
}

// ---------------- Prepare Update ----------------
function setFormForUpdate(productIndex) {
 
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");

  productNameInput.value = productContainer[productIndex].name;
  productPriceInput.value = productContainer[productIndex].price;
  productCategoryInput.value = productContainer[productIndex].category;
  productDescInput.value = productContainer[productIndex].desc;

  currentIndex = productIndex;
}

// ---------------- Do Update ----------------
function updateProduct() {

  productContainer[currentIndex].name = productNameInput.value;
  productContainer[currentIndex].price = productPriceInput.value;
  productContainer[currentIndex].category = productCategoryInput.value;
  productContainer[currentIndex].desc = productDescInput.value;

  localStorage.setItem("product", JSON.stringify(productContainer));

  displayProduct(productContainer);

  
  clearForm();

  
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
}

// ---------------- Delete ----------------
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("product", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

// ---------------- Clear Inputs ----------------
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

// ---------------- Search ----------------
function ProductSearch() {
  var searchValue = document
    .getElementById("searchProduct")
    .value.toLowerCase();
  var filteredProducts = productContainer.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
  displayProduct(filteredProducts);
}