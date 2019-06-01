// Scrape Script
// =============

// Require axios and cheerio
var axios = require("axios");
var cheerio = require("cheerio");


var URL = "https://thehackernews.com/search?"


function scrape(cb) {
    // First, we grab the body of the html with axios
    axios.get(URL).then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var articles = [];

        // Now, we grab every h2 within an article tag, and do the following:
        $("h2").each(function () {
            // Save an empty dataToAdd object
            var dataToAdd = {};

            // Add the text and href of every link, and save them as properties of the dataToAdd object
            dataToAdd.headline = $(this)
                .text()
                // Removes unwanted characters from the titles
                .replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ');
            dataToAdd.link = $(this)
                .parent().parent().parent().parent()
                .find("a")
                .attr("href");
            dataToAdd.img = $(this)
                .parent().parent().parent()
                .find("div.home-img").find("div.img-ratio").find("img")
                .attr("data-src")
            dataToAdd.summary = $(this)
                .parent()
                .find("div.home-desc")
                .text()
                .replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ')


            // // console.log(dataToAdd);
            // for (i = 0; i = dataToAdd.length; i++) {
            //     articles.push(dataToAdd[i]);
            // }
            articles.push(dataToAdd);
        });
        cb(articles);
        console.log(articles);
    });
};

module.exports = scrape;