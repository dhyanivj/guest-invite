document.addEventListener("DOMContentLoaded", function() {
    // Extract invitee name from the URL
    const inviteeName = getInviteeNameFromURL();

    // Set the invitee name on the web page
    setInviteeName(inviteeName);
});

function getInviteeNameFromURL() {
    // Get the current URL
    const url = window.location.href;

    // Extract the invitee name from the URL (assuming it's after the last '/')
    const parts = url.split('/');
    const inviteeName = parts[parts.length - 1];

    // Decode the URI component to handle special characters
    return decodeURIComponent(inviteeName);
}

function setInviteeName(name) {
    // Update the text content of the invitee name element
    const inviteeNameElement = document.getElementById('invitee-name');
    inviteeNameElement.textContent = name;
}

function updateInvitee() {
    // Get the input value
    const newInviteeName = document.getElementById('inviteeInput').value;

    // Update the text content of the invitee name element
    setInviteeName(newInviteeName);
}
