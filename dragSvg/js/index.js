$(document).ready(() => {
    bundle();
    $("#main-card").draggable();
    $("#editor").keyup(() => {
        bundle();
    });
});

function bundle() {
    const plainSvg = $("#editor").val();
    const escapedSvg = escapeHtml(plainSvg);
    const result = "background-image: url(\"data:image/svg+xml," + escapedSvg + "\");";
    $("body").attr("style", result);
}
function escapeHtml(s) {
    return s
         .replace(/#/g, "%23")
         .replace(/</g, "%3C")
         .replace(/>/g, "%3E")
         .replace(/"/g, "'")
         .replace(/\s{2,}/g, " ")
}
