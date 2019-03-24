const got = require('got');

let interestingFields = ({trackName, collectionName, artistName, trackTimeMillis, artworkUrl100}) => 
    ({trackName, collectionName, artistName, trackTimeMillis, artworkUrl100});

function search(query) {
    return got(`https://itunes.apple.com/search?media=music&entity=album&term=${query}&limit=50`, { json: true }).then(response => {
        return response.body.results.map((r) => interestingFields(r));
    }).catch(error => {
        throw Error(`Got error while calling itunes: ${error.body}`);
    });
}

module.exports = {search};