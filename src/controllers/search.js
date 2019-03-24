const got = require('got');

let interestingFields = ({trackName, artistName, trackTimeMillis, artworkUrl100}) => ({trackName, artistName, trackTimeMillis, artworkUrl100});

function search(query) {
    return got(`https://itunes.apple.com/search?media=music&term=${query}&limit=10`, { json: true }).then(response => {
        return response.body.results.map((r) => interestingFields(r));
    }).catch(error => {
        console.log(error.response.body);
    });
}

module.exports = {search};