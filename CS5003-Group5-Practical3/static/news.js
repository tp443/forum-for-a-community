/**
 * This is our document for the fundtionalities of the weather .
 * It enables our webpage to retrieve real-time data for specific towns
 * in the area of Five generated from several API's.
 *
 * @author dtb3,mb372,ty35
 * @date Mar 2018
 * @module js/news
 */


var apk = 'apiKey=6e086d4a8be1481a92f34d24e2bd5239';
var newsLength;
var title;
var newsImg;
var newsUrl;
var urlNews;
var keyword;
var toggle = false;

// get all sources and append to the dropdown list
var urlAllSource = 'https://newsapi.org/v2/sources?' + apk;
fetch(urlAllSource)
  .then(function(response) {
    return response.json();
  })
  // function to fill the dropdown list of sources
  .then(function(data) {
    allSource = data.sources;
    for (i = 0; i < allSource.length; i++) {
      sourceId = allSource[i].id;
      sourceName = allSource[i].name;
      $("#source").append("<option value='" + sourceId + "'>" + sourceName + "</option>")
    }
  })
  .catch(function(error) {
    console.log(error)
  })

/**
 *
 * @function sortNews - sort news by source or source and keyword
 * @param {string} place - user's choice of location
 */
function sortNews(place) {
  if (place == "Saint Andrews") {
    place = "St Andrews";
  } else if (place == "Home") {
    place = "Fife";
  } else {
    place = place;
  }

  toggle = true;
  $("#showNews").empty();
  var sourceSelected = $("#source").val();

  // judge whether a place is selected and point to different url
  if (toggle == true) {
    keyword = place;
    if (keyword == undefined) {
      keyword = $("#keyword").val();
      if (keyword == '') {
        urlNews = 'https://newsapi.org/v2/everything?sources=' + sourceSelected + '&' + apk;
      } else {
        urlNews = 'https://newsapi.org/v2/everything?sources=' + sourceSelected + '&q=' + keyword + '&' + apk;
      }
    } else {
      urlNews = 'https://newsapi.org/v2/everything?sources=' + sourceSelected + '&q=' + keyword + '&' + apk;
    }
    toggle = false;
  }

  fetch(urlNews)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      allNews = data.articles;
      // if no news was returned, show message
      if (allNews.length == 0) {
        document.getElementById("showNews").innerHTML = "Oops! No news about " + keyword + "!" + "<br><br>";
      }
      // if returned news is less than 5, then show all the news
      if (allNews.length <= 5) {
        newsLength = allNews.length;
      } else {
        // only show 5 latest news
        newsLength = 5;
      }
      for (i = 0; i < newsLength; i++) {
        title = allNews[i].title;
        newsImg = allNews[i].urlToImage;
        newsUrl = allNews[i].url;
        // generate news automatically
        // show title and related picture of the news
        $("#showNews").append("<p id='newsTitle'> <a href='" + newsUrl + "' id='newsUrl'>" + title + "</a>" + "<img src='" + newsImg + "' id='newsImg'/>" + "</p>")
      }
    })
    .catch(function(error) {
      // error handling
      // if something wrong of the API or can't get the news successfully
      // show error message
      document.getElementById("showNews").innerHTML = "Oops! Errors!";
      console.log(error)
    })
}
