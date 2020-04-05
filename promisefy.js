const EventEmitter=require('events');
const util=require('util');
let Promise=function () {
    EventEmitter.call(this);
};
util.inherits(Promise,EventEmitter);
Promise.prototype.then=function (fulfilledHander,errorHandler,progressHandler) {
    if (typeof fulfilledHander==='function'){
        this.once('success',fulfilledHander);
    }
    if (typeof errorHandler==='function'){
        this.once('error',errorHandler);
    }
    if (typeof progressHandler==='function'){
        this.once('progress',progressHandler);
    }
    return this;
}

let Deferred=function () {
    this.state='unfulfiled';
    this.promise=new Promise();
};
Deferred.prototype.resolve=function (obj) {
    this.state='fulfiled';
    this.promise.emit('success',obj);
};
Deferred.prototype.reject=function (err) {
    this.state='failed';
    this.promise.emit('error',err);
};
Deferred.prototype.progress=function (data) {
    this.promise.emit('progress',data);
};
let promisefy=function (res) {
    let deferred=new Deferred();
    let result='';
    res.on('data',function (chunk) {
        result+=chunk;
        deferred.progress(chunk);
    });
    res.on('end',function () {
        deferred.resolve(result);
    });
    res.on('error',function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};
exports.promisefy=promisefy;