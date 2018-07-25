$("#addSnippet").on("submit", function(event){
    event.preventDefault();
    var form = {
        name: event.target[0].value,
        snippet: event.target[1].value
    };

    console.log(form);
    addSnippet(form);
});

function addSnippet(form) {
    const app = firebase.app();
    const db = firebase.firestore();
    const collection = db.collection('ZFNB');
    
    collection
        .doc(form.name)
        .set(form, {merge: true})
        .then(success => {
        	console.log("doc saved");
        	window.location = "./keeper.html";
    });
    
}