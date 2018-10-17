// Filter fish that are "on sale"

// Add fish to "Basket"

const writeFishes = arrayOfFishes => {
  let domString = "";
  arrayOfFishes.forEach(fish => {
    domString += `
        <div class="${
          fish.onSale ? "on-sale" : ""
        } fish card col-md-6 col-md-offset-3">
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
        </div>
        `;
  });
  // Write to the available div
  $("#available").append(domString);
  // below would also work
  // $(domString).appendTo("#available");
  bindEvents();
};

const bindEvents = () => {
  // using .on because buttons added after page load
  $(".add").on("click", e => {
    // what is the div that has the fish
    const fishToMove = $(e.target).closest(".fish");
    // move it to the 'snagged' div
    $("#snagged").append(fishToMove);
    // button text => Remove from Basket & change the class (.add becomes .remove)
    $(e.target).text("Remove from Basket").addClass("remove").removeClass("add");
  });
};

// dynamically listen for events that happen on buttons with a class "add"
// $('body').on('click', 'button.add', () => {
// do something cool
// })

// Load Fish
$.get("../db/fishes.json")
  .done(data => {
    console.log(data);
    writeFishes(data.fishes);
  })
  .fail(error => {
    console.log(error);
  });
