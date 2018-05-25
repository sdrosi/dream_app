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

  }
  // This function figures out which dream we want to edit and takes it to the
  // Appropriate url
  function handleDreamEdit() {

  }

  // This function displays a message when there are no dreams
  function displayEmpty() {

  }

  // This function handles reloading new dreams when the category changes
  function handleCategoryChange() {

  }


});

