$(document).ready(function() {
    //dream container that holds all dreams posted.
    var dreamContainer = $(".dream-container");
    var privacySetting = $("#privacy-setting");
    //click events for the edit and delete button
    $(document).on("click", "button.delete", handleDreamsDelete);
    $(document).on("click", "button.edit", handleDreamsEdit);
    privacySetting.on("change", handleCategoryChange);

});
