const app = firebase.app();
const db = firebase.firestore();
const snip = [];
const collection = db.collection('ZFNB');

function onInit() {
        collection.onSnapshot(querySnap => {
            snip.length = 0;
            querySnap.forEach(doc => {
                snip.push({ 
                    "name": doc.data().name, 
                    "snippet": doc.data().snippet
                });
            });
            renderSnippets(snip);
            copyListed();
            deleteSnippet()
        }, onErr => {
            console.log(onErr);
            window.location = "./index.html";
        });
}

function copyListed() {
    $(".snippet").on("click", function() {
        let cmd = $(this)[0].childNodes[1].firstChild;
        console.log(cmd);
        let range = document.createRange();
        range.selectNode(cmd);
        window.getSelection().addRange(range);
        document.execCommand("Copy");
    });
}

function deleteSnippet() {
    $(".snippet-delete").on("click", function() {
        let snippetName = $(this).parent().children()[0].children[0].innerHTML;
        console.log("delete clicked", snippetName);
        collection.doc(snippetName).delete();
    });
}

function renderSnippets(data) {
    const snippets = document.getElementById("snippets");
    snippets.innerHTML = "";
    data.forEach(snippet => {
        let newSnippet = document.createElement("div");
        let snipName = document.createElement("div");
        let snipCmd = document.createElement("div");
        let snipCopy = document.createElement("div");
        let deleteBtn = document.createElement("div");

        snipName.innerHTML = "<span>" + snippet.name + "</span>: ";
        snipCmd.innerHTML = snippet.snippet;
        snipCopy.innerHTML = "<button class='button-black'>Copy</button>";
        deleteBtn.innerHTML = "<button class='button'>Delete</button>";

        newSnippet.classList = "snippet";
        snipName.classList = "snippet-name";
        snipCmd.classList = "snippet-cmd";
        deleteBtn.classList = "snippet-delete";
        snipCopy.classList = "snippet-copy";
        

        newSnippet.appendChild(snipName);
        newSnippet.appendChild(snipCmd);
        newSnippet.appendChild(deleteBtn);
        newSnippet.appendChild(snipCopy);
        snippets.appendChild(newSnippet);
    });
}

onInit();
