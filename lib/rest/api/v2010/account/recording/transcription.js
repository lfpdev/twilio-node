'use strict';

var _ = require('lodash');
var Q = require('q');
var Page = require('../../../../../base/Page');
var deserialize = require('../../../../../base/deserialize');
var values = require('../../../../../base/values');

var TranscriptionPage;
var TranscriptionList;
var TranscriptionInstance;
var TranscriptionContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionPage
 * @augments Page
 * @description Initialize the TranscriptionPage
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {string} accountSid - The account_sid
 * @param {string} recordingSid - The recording_sid
 *
 * @returns TranscriptionPage
 */
/* jshint ignore:end */
function TranscriptionPage(version, response, accountSid, recordingSid) {
  Page.prototype.constructor.call(this, version, response);

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    recordingSid: recordingSid
  };
}

_.extend(TranscriptionPage.prototype, Page.prototype);
TranscriptionPage.prototype.constructor = TranscriptionPage;

/* jshint ignore:start */
/**
 * Build an instance of TranscriptionInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns TranscriptionInstance
 */
/* jshint ignore:end */
TranscriptionPage.prototype.getInstance = function getInstance(payload) {
  return new TranscriptionInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.recordingSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionList
 * @description Initialize the TranscriptionList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - The account_sid
 * @param {string} recordingSid - The recording_sid
 */
/* jshint ignore:end */
function TranscriptionList(version, accountSid, recordingSid) {
  /* jshint ignore:start */
  /**
   * @function transcriptions
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionContext}
   */
  /* jshint ignore:end */
  function TranscriptionListInstance(sid) {
    return TranscriptionListInstance.get(sid);
  }

  TranscriptionListInstance._version = version;
  // Path Solution
  TranscriptionListInstance._solution = {
    accountSid: accountSid,
    recordingSid: recordingSid
  };
  TranscriptionListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Recordings/<%= recordingSid %>/Transcriptions.json' // jshint ignore:line
  )(TranscriptionListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams TranscriptionInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  TranscriptionListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done) {
            return false;
          }

          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, opts));
  };

  /* jshint ignore:start */
  /**
   * @description Lists TranscriptionInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  TranscriptionListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of TranscriptionInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  TranscriptionListInstance.page = function page(opts, callback) {
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new TranscriptionPage(
        this._version,
        payload,
        this._solution.accountSid,
        this._solution.recordingSid,
        this._solution.sid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a transcription
   *
   * @function get
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionList
   * @instance
   *
   * @param {string} sid - The sid
   *
   * @returns {Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionContext}
   */
  /* jshint ignore:end */
  TranscriptionListInstance.get = function get(sid) {
    return new TranscriptionContext(
      this._version,
      this._solution.accountSid,
      this._solution.recordingSid,
      sid
    );
  };

  return TranscriptionListInstance;
}


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionInstance
 * @description Initialize the TranscriptionContext
 *
 * @property {string} accountSid - The account_sid
 * @property {string} apiVersion - The api_version
 * @property {Date} dateCreated - The date_created
 * @property {Date} dateUpdated - The date_updated
 * @property {string} duration - The duration
 * @property {number} price - The price
 * @property {string} priceUnit - The price_unit
 * @property {string} recordingSid - The recording_sid
 * @property {string} sid - The sid
 * @property {transcription.status} status - The status
 * @property {string} transcriptionText - The transcription_text
 * @property {string} type - The type
 * @property {string} uri - The uri
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} accountSid - The account_sid
 * @param {sid} recordingSid - The recording_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
function TranscriptionInstance(version, payload, accountSid, recordingSid, sid)
                                {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.apiVersion = payload.api_version; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.duration = payload.duration; // jshint ignore:line
  this.price = deserialize.decimal(payload.price); // jshint ignore:line
  this.priceUnit = payload.price_unit; // jshint ignore:line
  this.recordingSid = payload.recording_sid; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.status = payload.status; // jshint ignore:line
  this.transcriptionText = payload.transcription_text; // jshint ignore:line
  this.type = payload.type; // jshint ignore:line
  this.uri = payload.uri; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    recordingSid: recordingSid,
    sid: sid || this.sid,
  };
}

Object.defineProperty(TranscriptionInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new TranscriptionContext(
        this._version,
        this._solution.accountSid,
        this._solution.recordingSid,
        this._solution.sid
      );
    }

    return this._context;
  },
});

/* jshint ignore:start */
/**
 * fetch a TranscriptionInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TranscriptionInstance
 */
/* jshint ignore:end */
TranscriptionInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a TranscriptionInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TranscriptionInstance
 */
/* jshint ignore:end */
TranscriptionInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionContext
 * @description Initialize the TranscriptionContext
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} recordingSid - The recording_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
function TranscriptionContext(version, accountSid, recordingSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    recordingSid: recordingSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/Recordings/<%= recordingSid %>/Transcriptions/<%= sid %>.json' // jshint ignore:line
  )(this._solution);
}

/* jshint ignore:start */
/**
 * fetch a TranscriptionInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TranscriptionInstance
 */
/* jshint ignore:end */
TranscriptionContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new TranscriptionInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.recordingSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a TranscriptionInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.TranscriptionContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed TranscriptionInstance
 */
/* jshint ignore:end */
TranscriptionContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  TranscriptionPage: TranscriptionPage,
  TranscriptionList: TranscriptionList,
  TranscriptionInstance: TranscriptionInstance,
  TranscriptionContext: TranscriptionContext
};