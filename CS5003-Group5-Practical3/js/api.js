/**
 * This is the team's API. It listens for HTTP requests and will make relevant responses.
 *
 * It also interacts with the DAO.js file and the model.js file
 *
 * The Week 9 complete app example by Dr Kasim Terzic proved a great base, and some of his code was paraphrased and implemented
 *
 * @author tmep,nn27,ty35,dtb3,mb372
 * @date April 27 2018
 * @module js/api
 */

(function() {

  let express = require('express');
  let bodyParser = require('body-parser');
  let model = require('./model.js');
  let dao = require('./dao.js');
  let PouchDB = require('pouchdb');
  let cors = require('cors');

  /**
   * If the app is opened up. This function is called to up and the id of the number of posts is returned
   *
   * @type {number}
   */
  let maxID;

  function setID(value) {
    maxID = value;
    console.log("Current Max Post ID: " + maxID);
  }

  /**
   * If the app is opened up. This function is called to up and the id of the number of users is returned
   *
   * @type {number}
   */
  let maxUserID;

  function setUserID(value) {
    maxUserID = value;
    console.log("Current Max User ID: " + maxUserID);
  }

  /**
   * The port our apllication will listen on
   *
   * @type {number}
   */
  let thePort;

  // Export the public methods of the module so we can run it from JS
  module.exports = {
    /**
     * Runs the application
     * @function
     * @returns {Object}    The newly created Express app
     */
    runApp,

    /**
     * Configure the app processing pipeline. Call directly instead of runApp() for
     * testing etc.
     * @function
     */
    configureApp,
  };

  /***********************************************************************************
   * Express Application
   ***********************************************************************************/

  /**
   * Run the app on the default port 9001. Makes use of configureApp to set up the
   * processing pipeline.
   *
   * @returns {Object} The newly created Express app
   */
  function runApp() {
    maxID = 7;
    maxUserID = 4;
    thePort = 3005;

    let app = express();
    dao.init(setID);
    dao.init2(setUserID);
    configureApp(app);
    console.log("Listening on port " + thePort);
    return app.listen(thePort);
  }

  /**
   * Configure the app processing pipeline.
   */
  function configureApp(app) {

    app.use(bodyParser.json({
      limit: '10mb'
    }));

    // If a get request is submitted with a valid location, the getPosts handler is called
    app.get("/getPosts/:location", getPosts);

    // If a "post" request is submitted, , the addPost handler is called which will add a new ID to the post

    app.post("/addPost", addPost);

    // If a get request is submitted to see the current users signed up, the getUsers handler is called
    app.get("/getUsers", getUsers);

    // If a "post" request is submitted, , the addUser handler is called which will add a new unique ID to the user
    app.post("/addUser", addUser);

    // For everything else, serve a static page from the
    // "static" directory.
    app.use('/', express.static('static'));
  }

  // Event Handlers

  /**
   * Handler for /getPosts resource. It will ask the Data Access Object
   * to fetch all items from the database and return an object containing
   * all of them via HTTP.
   *
   * It also reverses the posts so that they are recieved by the client descending date order.
   *
   * Reference: kt54 - W09 Final Example
   */
  var getPosts = function(req, res, next) {
    let location = req.params.location;

    // Ask the DAO to fetch all posts, and then process
    // the result in the callback
    dao.getPosts(location, function(posts) {
      var result = {
        'allposts': []
      };
      for (post of posts) {
        result.allposts.push(JSON.parse(post.toJSON()));
        //console.log(post);
      }
      result.allposts.reverse();
      // end the response with code 200 and the correct object
      res.status(200).end(JSON.stringify(result));
    });
  }

  /**
   * Handler for /addPost. It will receive a JSON object as the body
   * of the request, create a new forumPost from this JSON object and then ask
   * the Data Access Object to store this item in the database. It will incremnet
   * id from the previous highest post id.
   *
   * It will return the JSON object corresponsing to the newly created database object
   * as the body of the HTTP response
   *
   * Reference: kt54 - W09 Final Example
   */
  var addPost = function(req, res, next) {

    let id = ++maxID;

    jsonobj = req.body;
    jsonobj.id = id;

    let forumPost = new model.ForumPost();
    forumPost.fromJSON(jsonobj);

    dao.addPost(forumPost, function(repost, postObj) {
      let postId = repost.id;
      if (forumPost._imageAttachment != "") {
        dao.addPostAttachment(postObj, forumPost._imageAttachment.name, forumPost._imageAttachment['Content-Type'], forumPost._imageAttachment.data, function() {});
        repost.img = forumPost._imageAttachment.data;
      }
      res.status(201).end(JSON.stringify(repost));
    });
  }

  /**
   * Handler for /getUsers resource. It will ask the Data Access Object
   * to fetch all items relating to the users in the database and return an object containing
   * all of them via HTTP.
   *
   * Reference: kt54 - W09 Final Example
   */
  var getUsers = function(req, res, next) {
    // Ask the DAO to fetch all posts, and then process
    // the result in the callback
    dao.getUsers(function(users) {
      let result = {
        'allusers': []
      };
      for (user of users) {
        result.allusers.push(JSON.parse(user.toJSON()));
      }
      // end the response with code 200 and the correct object
      res.status(200).end(JSON.stringify(result));
    });
  }

  /**
   * Handler for /addUser. It will receive a JSON object as the body
   * of the request, create a new user from this JSON object and then ask
   * the Data Access Object to store this item in the database. It will incremnet
   * id from the previous highest user id.
   *
   * It will return the JSON object corresponsing to the newly created database object
   * as the body of the HTTP response
   *
   * Reference: kt54 - W09 Final Example
   */
  var addUser = function(req, res, next) {
    let id = ++maxUserID;
    jsonobj = req.body;
    jsonobj.id = id;
    let userAdding = new model.UserInfo();
    userAdding.fromJSON(jsonobj);

    dao.addUser(userAdding, function(repost) {
      console.log("Got: " + repost);
      res.status(201).end(JSON.stringify(repost));
    });
  }

})();
