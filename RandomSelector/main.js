window.onload = function () {
    //document.write("Hello JavaScript!");
};
$(document).ready(function() {
    $("input").click(function() {
        var numberOfListItem = $("#choices li").length;
        var randomChildNumber = Math.floor(Math.random() * numberOfListItem);
        $("h1").text($("#choices li").eq(randomChildNumber).text());
        $("img").attr("src", "RandomSelector/"+(randomChildNumber+1)+".jpg");
    });
});