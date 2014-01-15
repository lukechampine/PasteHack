PasteHack
=========

This hack arose from my desire to create a simple collaborative website. The problem was that I only had access to static hosting sites like GitHub Pages, so there was no way for me to write to a file on the server. The solution I came up with was to use Pastebin to store the data that would normally reside on the server. Each time a user modified the site, their edits would be stored as a Paste. The next time the site was accessed, the page would load the data from the Paste, and voila! Persistant storage without server access.

However, I quickly ran into a host of problems. Most pressingly, each Paste has a unique URL, and there's no way to edit an existing Paste. So after creating a new Paste, the page would still have to store the new URL somewhere -- which brings us right back to the original problem! Another issue is that the same-origin policy prevents JavaScript from accessing the Pastebin API. At this point I nearly lost hope, and set the project aside for a while.

After a few weeks, the idea was still bothering me, so I decided to check out the full Pastebin API documentation and look for a solution there. As it turns out, the `api_option` parameter has a `list` option, which returns all the Pastes created by a certain user. Aha! So I just have to create all the Pastes under the same user, and fetch the most recent one on page load. That solves problem #1.

Problem #2 is a bit trickier. Pastebin doesn't implement CORS, so there's only one way I can see to access the API from the browser: Greasemonkey. Browser extensions play by different rules, so Greasemonkey (and Scriptish) are able to make cross-domain XMLHttpRequests. The downside is that you have to install a userscript for the hack to work. Hopefully in the future everyone will implement CORS and this will cease to be a requirement, but this is something of a silly hack anyway so it doesn't concern me too much.

Speaking of which: **this hack requires you to expose your API key to the user**. I distribute this example in good faith that no one will abuse it by hijacking the account, deleting all the Pastes, etc. **PLEASE DO NOT USE THE METHOD DEMONSTRATED HERE FOR ANYTHING SERIOUS**. I would also strongly advise against using your real Pastebin account; make a dummy account instead.

Finally, I have no idea how well this will scale with multiple users. Most likely everything will break in spectacular fashion.
