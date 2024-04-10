document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".form-item");
    console.log(items);
    lastElement = items.length -1;
    items.forEach((item,index)=>{
        item.addEventListener("input", ()=>{
            items[index + 1].classList.add("active"); 
        })
        item.addEventListener("change",()=>{
            items[index + 1].classList.add("active"); 
        })
    });
  });
