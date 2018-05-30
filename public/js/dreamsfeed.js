$(document).ready(function () {
  //dream container that holds all dreams posted.
  var dreamContainer = $("#dream-container");
  var privacySetting = $("#privacy");
  //click events for the edit and delete button
  $(document).on("click", "td.delete", handleDreamsDelete);
  $(document).on("click", "td.edit", handleDreamsEdit);
  privacySetting.on("change", handleCategoryChange);
  var dreams;

  // This function grabs dreams from the database and updates the view
  function getDreams(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/privacy/" + categoryString;
      console.log("Category String:" + categoryString)
    }
    $.get("/social-feed/all" + categoryString, function (data) {
      console.log("Dreams", data);
      dreams = data;
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
      url: "/delete-dream/" + id
    })
      .then(function () {
        getDreams(privacySetting.val());
      });
  }

  // Getting the initial list of dreams
  getDreams();

  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    dreamContainer.empty();
    var dreamsToAdd = [];
    for (var i = 0; i < dreams.length; i++) {
      dreamsToAdd.push(createNewRow(dreams[i]));
    }
    dreamContainer.append(dreamsToAdd);
  }

  // This function constructs a dream's HTML
  function createNewRow(post) {
    console.log(post);
    var postPrivacy;
    if (post.privacy === true) {
      postPrivacy = "Private"
    }
    else if (post.privacy === false) {
      postPrivacy = "Public"
    }

    var newPostCard = $("<tr>");
    newPostCard.addClass("card");

    var newPostCardHeading = $("<td>");
    newPostCardHeading.addClass("card-header");

    var deleteBtn = $("<td><button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete button is-danger is-inverted");

    var editBtn = $("<td><button is-primary is-inverted>");
    editBtn.text("EDIT");
    editBtn.addClass("edit button is-primary is-inverted");

    var newPostTitle = $("<td>");
    newPostTitle.addClass("newPostTitle");

    var newPostDate = $("<td>");
    newPostDate.addClass("post-date")

    var newPostCategory = $("<td>");
    newPostCategory.text(postPrivacy);
    newPostCategory.addClass("post-category")

    var newPostCardBody = $("<td>");
    newPostCardBody.addClass("card-body");

    var newPostBody = $("<td>");
    newPostBody.addClass("post-body");

    newPostTitle.text(post.title + " ");

    newPostBody.text(post.dream);

    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);

    // newPostTitle.append(newPostDate);

    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    // newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardHeading.append(newPostDate);


    newPostCardBody.append(newPostTitle);
    newPostCardBody.append(newPostBody);

    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("dream", post);

    return newPostCard;
  }

  // This function figures out which dream we want to delete and then calls
  // deletePost
  function handleDreamsDelete() {
    var currentDream = $(this)
    .parent()
    .parent()
    .data("dream");
    deleteDream(currentDream.id);
  }
  // This function figures out which dream we want to edit and takes it to the
  // Appropriate url
  function handleDreamsEdit() {
    var currentDream = $(this)
      .parent()
      .parent()
      .data("dream");
    window.location.href = "/new-dream?dream_id=" + currentDream.id;
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

