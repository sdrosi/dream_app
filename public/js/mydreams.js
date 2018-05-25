$(document).ready(function () {
  //dream container that holds all dreams posted.
  var dreamContainer = $(".dream-container");
  var privacySetting = $("#privacy-setting");
  //click events for the edit and delete button
  $(document).on("click", "button.delete", handleDreamsDelete);
  $(document).on("click", "button.edit", handleDreamsEdit);
  privacySetting.on("change", handleCategoryChange);

  // This function grabs dreams from the database and updates the view
  function getDreams(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryStrings;
    }
    $.get("/api/dreams" + cateogyString, function (data) {
      console.log("Dreams", data);
      post = data;
      if (!dreams || !dreams.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }


  // This function does an API call to delete dreamss
  function deleteDream(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/dreams/" + id
    })
      .then(function () {
        getDreams(dreamsCategorySelect.val());
      });
  }

  // Getting the initial list of dreams
  getDreams();

  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < dreams.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(dreamsToAdd);
  }

  // This function constructs a dream's HTML
  function createNewRow(dream) {
    var newDreamCard = $("<div>");
    newDreamCard.addClass("box");
    var newDreamCardHeading = $("<div>");
    newDreamCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deletBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newDreamTitle = $("<h2>");
    var newDreamDate = $("<small>");
    var newDreamCategory = $("<h5>");
    newDreamCategory.text(dream.category);
    newDreamCategory.css({
      float: "right",
      "font-weight" : "700",
      "margin-top" : "-15px"
    });
    var newDreamCardBody = $("<div>");
    newDreamCardBody.addClass("card-body");
    var newDreamBody = $("<p>");
    newDreamTitle.text(dream.title + " ");
    newDreamBody.text(dream.body);
    var formattedDate = new Date(dream.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newDreamDate.text(formattedDate);
    newDreamTitle.append(newDreamDate);
    newDreamCardHeading.append(deleteBtn);
    newDreamCardHeading.append(editBtn);
    newDreamCardHeading.append(newPostTitle);
    newDreamCardHeading.append(newDreamCategory);
    newDreamCardBody.append(newDreamBody);
    newDreamCard.append(newDreamCardHeading);
    newDreamCard.append(newDreamCardBody);
    newDreamCard.data("dream", dream);
    return newDreamCard;
  }

  // This function figures out which dream we want to delete and then calls
  // deletePost
  function handleDreamDelete() {
    var currentDream = $(this)
    .parent()
    .parent()
    .data("dream");
    deleteDream(currentDream.id);
  }
  // This function figures out which dream we want to edit and takes it to the
  // Appropriate url
  function handleDreamEdit() {
    var currentDream = $(this)
    .parent()
    .parent()
    .data("dream");
    window.location.href = "/cms?dream_id=" + currentDream.id;
  }

  // This function displays a message when there are no dreams
  function displayEmpty() {
    dreamContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new dream.");
    dreamContainer.append(messageH2);
  }

  // This function handles reloading new dreams when the category changes
  function handleCategoryChange() {
    var newDreamCategory = $(this).val();
    getDreams(newDreamCategory);
  }

});

