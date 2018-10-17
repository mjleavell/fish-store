// Show discount price
const discount = .12;

const applySale = () => {
    $(".on-sale").each((i, fish) => {
        const fullPrice = $(fish).find('.price');
        // console.log(parseInt(fullPrice.html()))
    // have to use parse because fullPrice and basePrice are strings
        const newPrice  = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        // console.log(newPrice)
        fullPrice.html(newPrice);
    })
}

// Add fish to "Basket"
const writeFishes = arrayOfFishes => {
  let domString = "";
  arrayOfFishes.forEach(fish => {
    domString += `
        <div class="${fish.onSale ? "on-sale" : ""} fish card col-md-6 col-md-offset-3">
            <div class="thumbnail">
                <img src="${fish.imageSoure}"
                    alt="" width="40%">
                <div class="caption">
                    <h3 id="thumbnail-label">${fish.name}</h3>
                    <p>$
                        <span class="price">${fish.basePrice}</span>
                    </p>
                </div>
                <div class="caption card-footer">
                    <button class="add btn btn-danger">Add To Basket</button>
                </div>
            </div>
        </div>`;
  });
  // Write to the available div
  $("#available").append(domString);
  // below would also work
  // $(domString).appendTo("#available");
  //bindEvents();
};

//const bindEvents = () => {
  // using .on because buttons added after page load
  //$(".add").on("click", e => {
    // what is the div that has the fish
    //const fishToMove = $(e.target).closest(".fish");
    // move it to the 'snagged' div
    //$("#snagged").append(fishToMove);
    // button text => Remove from Basket & change the class (.add becomes .remove)
   // $(e.target).text("Remove From Basket").addClass("remove").removeClass("add");
  //});
  // Remove Fish
  //$(".remove").on("click", e => {
    //const fishToRemove = $(e.target).closest(".fish");
    //$("#available").append(fishToRemove);
    //$(e.target).text("Add To Basket").addClass("add").removeClass("remove");
  //});
//};

// dynamically listen for events that happen on buttons with a class "add"
$('body').on('click', 'button.add', (e) => {
     // what is the div that has the fish
     const fishToMove = $(e.target).closest(".fish");
     // move it to the 'snagged' div
     $("#snagged").append(fishToMove);
     // button text => Remove from Basket & change the class (.add becomes .remove)
    $(e.target).text("Remove From Basket").addClass("remove").removeClass("add");
})

$('body').on('click', 'button.remove', (e) => {
    const fishToMove = $(e.target).closest(".fish");
    $("#available").append(fishToMove);
    $(e.target).text("Add To Basket").addClass("add").removeClass("remove");
})

// hide fish that arent on sale
$('#show-sale').on('click', () => {
    $('.fish').not(".on-sale").toggle();
    $('#show-sale').text((i, text) => {
        return (text === "Show Sale Fish") ? "Show All" : "Show Sale Fish"
        // if (text === "Show Sale Fish") {
        //     return "Show All"
        // } else {
        //     return "Show Sale Fish"
        // }
    })
})

// Load Fish (getting data from json file)
$.get("../db/fishes.json")
  .done(data => {
    // console.log(data);
    writeFishes(data.fishes);
    applySale();
  })
  .fail(error => {
    console.log(error);
  });