let products = {
  data: [
    {
      productName: "Regular White T-Shirt",
      category: "Topwear",
      price: "30",
      image: "https://www.creaturesofhabit.in/cdn/shop/files/MarshmallowWhite_S_54370002_1_1800x1800.jpg?v=1707820595",
    },
    {
      productName: "Beige Short Skirt",
      category: "Bottomwear",
      price: "49",
      image: "https://littleboxindia.com/cdn/shop/products/Y2K_Trending_Utility_Skirt_In_Apricot_460x.jpg?v=1742285267",
    },
    {
      productName: "Sporty SmartWatch",
      category: "Watch",
      price: "99",
      image: "https://www.gonoise.com/cdn/shop/files/Blacksilicon_eb773a4e-2e77-42fb-ad54-fa27159174c8.png?v=1712750603",
    },
    {
      productName: "Basic Knitted Top",
      category: "Topwear",
      price: "29",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSKpNgzmKY6-snlGQ0zToI2btmXwSneanMiNymktSQz1ktESWPsdznViR59k2md5JG02zth7iTzv-f5zRM8ihlOtfM0fZvckkEHtpwk8wQmFI2xgXNVmQIiQN18",
    },
    {
      productName: "Black Leather Jacket",
      category: "Jacket",
      price: "129",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRt5qaPZ4q9RlHIltdbBshwOkopPn5YgLmJe4U9PDcO05FeE_8l5l-kkCgAAOrq0InvCtFOzH1XLRplWCjKY17gwdTNV8MtCsh7z6CHsXbn",
    },
    {
      productName: "Stylish Pink Trousers",
      category: "Bottomwear",
      price: "89",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQmP6qqIR04IcRfXPl-gQyvVj7gpPjVlSlAJJis5g74doy1ipWWVwOedFdjE573p6xNAsLcCgmhXdhzJBlgXCff8WmmGkuMOdju1vBdEX-p",
    },
    {
      productName: "Brown Men's Jacket",
      category: "Jacket",
      price: "189",
      image: "https://static.zara.net/assets/public/1b31/b6c6/1fc64e45ad23/73c1f8b850b3/06987406700-p/06987406700-p.jpg?ts=1738767732063&w=750",
    },
    {
      productName: "Comfy Gray Pants",
      category: "Bottomwear",
      price: "49",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSlbYTUsetOpyITAYxWud9Mzlx8kMnfNPcww&s",
    },
  ],
};

for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //price
  let price = document.createElement("h6");
  price.innerText = "$" + i.price;
  container.appendChild(price);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};

