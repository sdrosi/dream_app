//variables

$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var dreamId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var title = $("#title");
    var mood = $("#mood option:selected");
    var dream_input = $("#dream_input");
    var public = $("#public option:selected");
    var submit = $("#submit");
    var form = $("#cms");

    
    // Giving the postCategorySelect a default value
    public.val("Private");
    mood.val("none")

    // Adding an event listener for when the form is submitted
    $(form).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!title.val().trim() || !dream_input.val().trim()|| !mood.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newDream = {
        title: title.val().trim(),
        mood: mood.val(),
        dream_input: dream_input.val(),
        public: public.val() 
      };
  
      console.log(newDream);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newDream.id = postId;
        updateDream(newDream);
      }
      else {
        submitDream(newDream);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitDream(Dream) {
      $.post("/api/dream/", Post, function() {
        window.location.href = "/blog";
      });
    }
  
    // Gets post data for a post if we're editing
    function getPostData(id) {
      $.get("/api/api/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          postCategorySelect.val(data.category);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
          window.location.href = "/blog";
        });
    }
  });
  