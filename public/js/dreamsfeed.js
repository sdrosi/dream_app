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
      if (!posts || !posts.length) {
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
      url: "/api/posts/" + id
    })
      .then(function () {
        getPosts(dreamsCategorySelect.val());
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

