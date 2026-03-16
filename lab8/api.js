'use strict'

function displayConstituency(data) {
    document.getElementById('result_section').style.display = 'block';
    document.getElementById('constituency').innerText = data.result.scottish_parliamentary_constituency;

}

function displayConstituencyShortName(shortName) {
    document.getElementById('constituencyShort').innerText = shortName;
}

function selectApiMethod(apiMethod, url) {

    let baseUrlConstituencies = "https://data.parliament.scot/api/constituencies";
    var constituencyCode;

    if (apiMethod === 'fetch') {
        console.log('API call using fetch');

        fetch(url)
            .then(response => {
                if (response.status === 404) {
                    alert("Postcode not found");
                    throw new Error("Postcode not found");
                }
                return response;
            })
            .then(response => response.json())
            .then(data => {
                displayConstituency(data);
                constituencyCode = data.result.codes.scottish_parliamentary_constituency;
                return fetch(baseUrlConstituencies);
            })
            .then(response => response.json())
            .then((response) => {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].ConstituencyCode === constituencyCode) {
                        displayConstituencyShortName(response[i].ShortName);
                        break;
                    }
                }
            });


    } else if (apiMethod === 'xhr') {
        console.log('API call using XMLHttpRequest');

        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 200) {
                // this.responseText is the string that we receive from the API
                // The response is a string, so we need to parse it into JSON
                // The data is then turned into a JavaScript object which is much easier to access
                let data = JSON.parse(this.responseText);
                console.log(data);
                displayConstituency(data);
                constituencyCode = data.result.codes.scottish_parliamentary_constituency;
                const xhr2 = new XMLHttpRequest();
                xhr2.addEventListener("readystatechange", function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let constituencies = JSON.parse(this.responseText);
                        for (let i = 0; i < constituencies.length; i++) {
                            if (constituencies[i].ConstituencyCode === constituencyCode) {
                                displayConstituencyShortName(constituencies[i].ShortName);
                                break;
                            }
                        }
                    }
                });
                xhr2.open("GET", baseUrlConstituencies);
                xhr2.send();
            } else if (this.readyState === 4 && this.status === 404) {
                alert("Postcode not found");
            }

        });

        xhr.open("GET", url);
        xhr.send();
    }
}

function postcodeApiCall(evt) {
    evt.preventDefault();
    let postcode = document.getElementById('postcode').value.trim();
    let baseUrl = 'https://api.postcodes.io/scotland/postcodes/';

    // sanitise input
    postcode = postcode.toLowerCase();
    // encodes the URI component to turn special characters into a suitable format for a URL
    postcode = encodeURI(postcode);

    let url = baseUrl + postcode;
    console.log(url);

    selectApiMethod('xhr', url);

}

const postcodeForm = document.getElementById('postcodeForm');
postcodeForm.addEventListener('submit', postcodeApiCall);

