// Replace the YOUR_API_ENDPOINT_URL with yours
// It should look something like this:
// https://example1a2s3d.execute-api.us-east-1.amazonaws.com/dev/prometheon

// Do NOT include the /id but make sure you DO include the /prometheon

var API_ENDPOINT = 'https://example1a2s3d.execute-api.us-east-1.amazonaws.com/dev/prometheon';

// Setup divs that will be used to display interactive messages
var errorDiv = document.getElementById('error-message')
var successDiv = document.getElementById('success-message')
var resultsDiv = document.getElementById('results-message')

// Setup easy way to reference values of the input boxes
function ArtistValue() { return document.getElementById('Artist').value }
function SongTitleValue() { return document.getElementById('SongTitle').value }
function AlbumTitleValue() { return document.getElementById('AlbumTitle').value }
function CriticRatingValue() { return document.getElementById('CriticRating').value }
function GenreValue() { return document.getElementById('Genre').value }
function PriceValue() { return document.getElementById('Price').value }

function clearNotifications() {
    // Clear any exisiting notifications in the browser notifications divs
    errorDiv.textContent = '';
    resultsDiv.textContent = '';
    successDiv.textContent = '';
}

// Add listeners for each button that make the API request

document.getElementById('listButton').addEventListener('click', function (event) {
    // Prevent the page reloading and clear exisiting notifications
    event.preventDefault()
    clearNotifications()
    // Prepare the appropriate HTTP request to the API with fetch
    // list uses the base /prometheon resource path and doesn't require
    // a payload or query string paramaters
    fetch(API_ENDPOINT, {
        method: 'GET',
        mode: 'cors'
    })
    .then((resp) => resp.json()) 
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Success! Check the fetched items below';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
});


document.getElementById('getButton').addEventListener('click', function (event) {
    // Prevent the page reloading and clear exisiting notifications
    event.preventDefault()
    clearNotifications()
    // Prepare the appropriate HTTP request to the API with fetch
    // get uses the /prometheon/id resource path and query string paramaters
    // The final result is a GET request to something like:
    // https://example1a2s3d.execute-api.us-east-1.amazonaws.com/dev/prometheon/id?Artist=Rihanna&SongTitle=Work
    fetch(API_ENDPOINT+'/id?Artist='+ArtistValue()+'&SongTitle='+SongTitleValue(), {
        headers:{
            "Content-type": "application/json"
        },
        method: 'GET',
        mode: 'cors'
    })
    .then((resp) => resp.json()) 
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Success! Check the fetched item below';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
});


document.getElementById('deleteButton').addEventListener('click', function (event) {
    // Prevent the page reloading and clear exisiting notifications
    event.preventDefault()
    clearNotifications()
    // Prepare the appropriate HTTP request to the API with fetch
    // Delete used the /prometheon/id resource path 
    // It also requires a JSON body payload
    fetch(API_ENDPOINT+'/id', {
        headers:{
            "Content-type": "application/json"
        },
        method: 'DELETE',
        body: JSON.stringify({
            'Artist': ArtistValue(),
            'SongTitle': SongTitleValue()
        }),
        mode: 'cors'
    })
    .then((resp) => resp.json()) 
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Success! Check the status of the item below';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
});


document.getElementById('updateButton').addEventListener('click', function (event) {
    // Prevent the page reloading and clear exisiting notifications
    event.preventDefault()
    clearNotifications()    
    // Prepare the appropriate HTTP request to the API with fetch
    // update uses the /prometheon/id endpoint and requires a JSON payload
    fetch(API_ENDPOINT+'/id', {
        headers:{
            "Content-type": "application/json"
        },
        method: 'PUT',
        body: JSON.stringify({
            'Artist': ArtistValue(),
            'SongTitle': SongTitleValue(),
            'AlbumTitle': AlbumTitleValue(),
            'CriticRating': CriticRatingValue(),
            'Genre': GenreValue(),
            'Price': PriceValue()
        }),
        mode: 'cors'
    })
    .then((resp) => resp.json()) 
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Success! Check the updated item below';
        resultsDiv.textContent = JSON.stringify(data);

    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
});


document.getElementById('createButton').addEventListener('click', function (event) {
    // Prevent the page reloading and clear exisiting notifications
    event.preventDefault()
    clearNotifications()
    // Prepare the appropriate HTTP request to the API with fetch
    // create uses the root /prometheon endpoint and requires a JSON payload
    fetch(API_ENDPOINT, {
        headers:{
            "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            Artist: ArtistValue(),
            SongTitle: SongTitleValue(),
            AlbumTitle: AlbumTitleValue(),
            CriticRating: CriticRatingValue(),
            Genre: GenreValue(),
            Price: PriceValue()
        }),
        mode: 'cors'
    })
    .then((resp) => resp.json()) 
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Success! Check the created item below';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
});



