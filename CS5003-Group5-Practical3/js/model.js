/**
 * This is our model. It will define all of our data and how to
 * interact with it. This file is repaeted in the client.js and on ther server side
 * in order to make the program more consistent
 *
 * The Week 9 complete app example by Dr Kasim Terzic proved a great base, and some of his code was paraphrased and implemented
 *
 * @author tmep,nn27,ty35,dtb3,mb372
 * @date Mar 2018
 * @module js/model
 */

(function() {

  /**
   * Class representing a UserInfor Item. This will contain the id, username and password of the user
   */
  class UserInfo {
    /**
     * Create a new User item
     *
     * @param {number} id - The ID of the new item
     * @param {string} userName - username created by user
     * @param {string} password - password created by user
     */

    constructor(id, userName, password) {

      // Check if we got all arguments, otherwise initialise to empty/zero
      if (typeof(userName) != 'undefined') {
        this._id = id;
        this._userName = userName;
        this._password = password;
      } else {
        this._id = -1;
        this._userName = "";
        this._password = "";
      }
    }

    // Getters and setters. Do not allow setting id

    /**
     * The ID of this item
     * @type {number}
     * @readonly
     */
    get id() {
      return this._id;
    }

    /**
     * Username inputted by the user
     * @type {string}
     */
    get userName() {
      return this._userName;
    }
    set userName(d) {
      this._userName = d;
    }

    /**
     * The password for the user. this is set by the user
     * @type {string}
     */
    get password() {
      return this._password;
    }
    set password(c) {
      this._password = c;
    }

    /**
     * Returns the  properties as a JSON object.
     * This is passed over a network
     *
     * @returns {Object} The JSON representation
     */
    toJSON() {
      let result = {};
      result.id = this._id;
      result.userName = this._userName;
      result.password = this._password;

      return JSON.stringify(result);
    }

    /**
     * Takes a JSON object and reads the properties from it.
     *
     * @param {Object} json - The JSON representation to initialise from
     */
    fromJSON(json) {
      if (json.hasOwnProperty('id') && typeof(json.id) === 'number' && json.id >= 0)
        this._id = json.id;

      if (json.hasOwnProperty('userName') && typeof(json.userName) === 'string' && json.userName != "")
        this._userName = json.userName;

      if (json.hasOwnProperty('password') && typeof(json.password) === 'string' && json.password != "")
        this._password = json.password;

    }
  }

  class ForumPost {
    /**
     * Create a new Forum Post item
     *
     * @param {number} id - The ID of the new item
     * @param {string} screenName - The name of the user who is posting a message
     * @param {string} place - Forum post describing location
     * @param {string} message - User's message
     * @param {string} postedAt - Date of message //Dobule check
     * @param {string} locationOfUser - Location of user when posting message
     * @param {object} imageAttachment - Attach image to post
     */

    constructor(id, screenName, place, message, postedAt, locationOfUser, imageAttachment) {
      //Dictionary of what towns can be used
      this._place = ['St-Andrews', 'Cupar', 'Dundee', 'Newport', 'Glenrothes'];

      // Check if we got all arguments, otherwise initialise to empty/zero
      if (typeof(screenName) != 'undefined') {
        this._id = id;
        this._screenName = screenName;
        this._place = place;
        this._message = message;
        this._postedAt = postedAt;
        this._locationOfUser = locationOfUser;
        this._imageAttachment = imageAttachment;
      } else {
        this._id = -1;
        this._screenName = "";
        this._place = "";
        this._message = "";
        this._postedAt = "";
        this._locationOfUser = "";
        this._imageAttachment = {};
      }
    }

    // Getters and setters. Do not allow setting id


    /**
     * The ID of the post
     * @type {number}
     * @readonly
     */
    get id() {
      return this._id;
    }

    /**
     * the user who is posting the message
     * @type {string}
     */
    get screenName() {
      return this._screenName;
    }
    set screenName(d) {
      this._screenName = d;
    }

    /**
     * The location of the psot being described
     * @type {string}
     */
    get place() {
      return this._place;
    }
    set place(c) {
      this._place = c;
    }

    /**
     * The forum message inputted by the user
     * @type {string}
     */
    get message() {
      return this._message;
    }
    set message(d) {
      this._message = d;
    }

    /**
     * the time of posting
     * @type {string}
     */
    get postedAt() {
      return this._postedAt;
    }
    set postedAt(d) {
      this._postedAt = d;
    }

    /**
     * the location of where the user is
     * @type {string}
     */
    get locationOfUser() {
      return this._locationOfUser;
    }
    set locationOfUser(d) {
      this._locationOfUser = d;
    }

    /**
     * Image posted by user
     * @type {string}
     */
    get imageAttachment() {
      return this._imageAttachment;
    }
    set imageAttachment(d) {
      this._imageAttachment = d;
    }

    /**
     * Returns the important properties as a JSON object.
     * We can then pass this over a network
     *
     * @returns {Object} The JSON representation
     */
    toJSON() {
      let result = {};
      result.id = this._id;
      result.screenName = this._screenName;
      result.place = this._place;
      result.message = this._message;
      result.postedAt = this._postedAt;
      result.locationOfUser = this._locationOfUser;
      result.imageAttachment = this._imageAttachment;

      return JSON.stringify(result);
    }

    /**
     * Takes a JSON object and reads the properties from it.
     * We might receive such an object over the network and want
     * to create an object that is easier to manipulate
     *
     * @param {Object} json - The JSON representation to initialise from
     */
    fromJSON(json) {
      if (json.hasOwnProperty('id') && typeof(json.id) === 'number' && json.id >= 0)
        this._id = json.id;

      if (json.hasOwnProperty('screenName') && typeof(json.screenName) === 'string' && json.screenName != "")
        this._screenName = json.screenName;

      if (json.hasOwnProperty('place') && typeof(json.place) === 'string' && json.place != "")
        this._place = json.place;

      if (json.hasOwnProperty('message') && typeof(json.message) === 'string' && json.message != "")
        this._message = json.message;

      if (json.hasOwnProperty('postedAt') && typeof(json.postedAt) === 'string' && json.postedAt != "")
        this._postedAt = json.postedAt;

      if (json.hasOwnProperty('locationOfUser') && typeof(json.locationOfUser) === 'string' && json.locationOfUser != "")
        this._locationOfUser = json.locationOfUser;

      if (json.hasOwnProperty('imageAttachment') && json.imageAttachment != "")
        this._imageAttachment = json.imageAttachment;
    }
  }


  //Export parts that should be public

  let exports = {

    ForumPost,
    UserInfo
  }

  if (typeof __dirname == 'undefined')
    window.exports = exports;
  else // Running in node.js
    module.exports = exports;

}())
