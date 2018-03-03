
function fetchSnippets() {
        const app = firebase.app();
        const db = firebase.firestore();
        const snip = [];
        const collection = db.collection('ZFNB');
        collection.onSnapshot(querySnap => {
            snip.length = 0;
            querySnap.forEach(doc => {
                snip.push({ "name": doc.data().name, "snippet": doc.data().snippet});
            });
            addSnippets(snip);
            copyListed();
        }, onErr => {
            console.log(onErr);
            window.location = "./index.html";
        });
}

function copyListed() {
    $(".snippet").on("click", function() {
        let cmd = $(this)[0].childNodes[1];
        let range = document.createRange();
        range.selectNode(cmd);
        window.getSelection().addRange(range);
        document.execCommand("Copy");
    });
}

function addSnippets(data) {
    const snippets = document.getElementById("snippets");
    snippets.innerHTML = "";
    data.forEach(snippet => {
        let newSnippet = document.createElement("div");
        let snipName = document.createElement("div");
        let snipCmd = document.createElement("div");
        let snipCopy = document.createElement("div");

        snipName.innerHTML = "<span>" + snippet.name + "</span>: ";
        snipCmd.innerHTML = snippet.snippet;
        snipCopy.innerHTML = "[Copy]";

        newSnippet.classList = "snippet";
        snipName.classList = "snippet-name";
        snipCmd.classList = "snippet-cmd";
        snipCopy.classList = "snippet-copy";

        newSnippet.appendChild(snipName);
        newSnippet.appendChild(snipCmd);
        newSnippet.appendChild(snipCopy);
        snippets.appendChild(newSnippet);
    });
}

fetchSnippets();
