const got = require('got');

let interestingFields = ({trackName, collectionName, artistName, trackTimeMillis, artworkUrl100}) => 
    ({trackName, collectionName, artistName, trackTimeMillis, artworkUrl100});

function search(query) {
    return got(`https://itunes.apple.com/search?media=music&entity=album&term=${query}&limit=10`, { json: true }).then(response => {
        return response.body.results.map((r) => interestingFields(r));
    }).catch(error => {
        console.log(error.response.body);
    });
}

module.exports = {search};