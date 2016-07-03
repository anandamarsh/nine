/**
 * Created by amarshanand on 2/07/2016.
 */

var should = require('should');
var should_http = require('should-http');
var assert = require('assert');
var request = require('supertest');
var fs = require('fs');

describe('Nine Test Suite', function() {

    var url = 'https://ninemi.herokuapp.com';
    //var url = 'http://localhost:3000';

    var minimalValidJSON;
    beforeEach(function(done) {
        // we prepare this sample JSON for boundary condition testing. a complete sample JSON is present in sample_req.json
        minimalValidJSON = { "payload" : [{
            "drm": true,
            "episodeCount": 3,
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg"
            },
            "slug": "show/16kidsandcounting",
            "title": "16 Kids and Counting",
        }]
        };
        done();
    });

    // set of tests to establish connectivity
    describe('Connectivity', function() {

        it('should return status code 404 for a hit to an invalid api endpoint', function(done) {
            request(url).post('/invalidendpoint').end(function(err, res) {
                if (err) throw err;
                res.should.have.status(404);
                done();
            });
        });
        it('should return status code 400 for a hit to an valid api endpoint with blank request', function(done) {
            request(url).post("").end(function(err, res) {
                if (err) throw err;
                res.should.have.status(400);
                done();
            });
        });

        // positive tests will be provided in following test cases

    });

    // set of tests to ensure correct responses are returned
    describe('Responses : Negative cases', function() {

        it('should return status code 400 and an error message if the request body is empty', function (done) {
            request(url).post("").end(function (err, res) {
                if (err) throw err;
                res.should.have.status(400);
                res.body.error.should.equal("Could not decode request: JSON parsing failed");
                done();
            });
        });
        it('should return status code 400 and an error message if the request body is not a JSON', function (done) {
            request(url).post("").send("some_string").end(function (err, res) {
                if (err) throw err;
                res.should.have.status(400);
                res.body.error.should.equal("Could not decode request: JSON parsing failed");
                done();
            });
        });
        it('should return status code 400 and an error message if the request body doesnt have the payload', function (done) {
            request(url).post("").send({}).end(function (err, res) {
                if (err) throw err;
                res.should.have.status(400);
                res.body.error.should.equal("Could not decode request: JSON parsing failed");
                done();
            });
        });

    });

    // set of tests to ensure correct responses are returned
    describe('Responses : Positive cases - discard incomplete sections', function() {

        it('should return empty array for an empty request', function (done) {
            delete minimalValidJSON.payload[0]; // we empty the payload for our minimalValidJSON
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });

        it('should discard a section that doesnt have drm field', function (done) {
            delete minimalValidJSON.payload[0].drm;
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });
        it('should discard a section that doesnt have drm as true', function (done) {
            minimalValidJSON.payload[0].drm = false;
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });

        it('should discard a section that doesnt have episodeCount field as a number', function (done) {
            minimalValidJSON.payload[0].episodeCount = "not_a_number";
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });
        it('should discard a section that doesnt have episodeCount>0', function (done) {
            minimalValidJSON.payload[0].episodeCount = 0;
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });

        it('should discard a section that doesnt have image/showImage field', function (done) {
            delete minimalValidJSON.payload[0].image.showImage;
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });

        it('should discard a section that doesnt have slug field', function (done) {
            delete minimalValidJSON.payload[0].slug;
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });

        it('should discard a section that doesnt have title field', function (done) {
            delete minimalValidJSON.payload[0].title;
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function (err, res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(0);
                    done();
                });
        });

    });

    describe('Responses : Positive cases - test against valid data', function() {

        it('should return minimal JSON in expected format', function(done){
            request(url).post("").send(minimalValidJSON)
                .expect('Content-Type', /json/) // correct content type
                .expect(200) // correct status code
                .end(function(err,res) {
                    if (err) throw err;
                    res.body.should.have.property('response');
                    res.body.response.should.be.instanceof(Array).and.have.lengthOf(1);
                    res.body.response[0].image.should.equal(minimalValidJSON.payload[0].image.showImage);
                    res.body.response[0].slug.should.equal(minimalValidJSON.payload[0].slug);
                    res.body.response[0].title.should.equal(minimalValidJSON.payload[0].title);
                    done();
                });
        });

        it('should return correct response for JSON given in the spec', function(done) {
            var reqJSONfilename = './test/sample_req.json', resJSONfilename = './test/sample_res.json';
            fs.readFile(reqJSONfilename, function(err, reqData) {
                if (err) throw "Unable to read file "+reqJSONfilename;
                var reqJSON = JSON.parse(reqData);
                request(url).post("").send(reqJSON)
                    .expect('Content-Type', /json/) // correct content type
                    .expect(200) // correct status code
                    .end(function(err, res) {
                        if (err) throw err;
                        fs.readFile(resJSONfilename, function(err, resData) {
                            if (err) throw "Unable to read file "+resJSONfilename;
                            var resJSON = JSON.parse(resData);
                            res.body.should.deepEqual(resJSON);
                            done();
                        });
                    });
            });
        });

    });

});