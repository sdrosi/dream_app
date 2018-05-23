$(document).ready(function () {
    //dream container that holds all dreams posted.
    var dreamContainer = $(".dream-container");
    var privacySetting = $("#privacy-setting");
    //click events for the edit and delete button
    $(document).on("click", "button.delete", handleDreamsDelete);
    $(document).on("click", "button.edit", handleDreamsEdit);
    privacySetting.on("change", handleCategoryChange);

    // This function grabs posts from the database and updates the view

    // This function does an API call to delete posts

    // Getting the initial list of posts

    // InitializeRows handles appending all of our constructed post HTML inside
    // blogContainer

    // This function constructs a post's HTML

    // This function figures out which post we want to delete and then calls
    // deletePost

    // This function figures out which post we want to edit and takes it to the
  // Appropriate url

  // This function displays a message when there are no posts

  // This function handles reloading new posts when the category changes



});
