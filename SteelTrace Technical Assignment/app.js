var Express = require("express");
var BodyParser = require("body-parser");
var JsonWebToken = require("jsonwebtoken");
var Bcrypt = require("bcryptjs");
var TwoFactor = require("node-2fa");
var app = Express();

app.use(BodyParser.json());

app.set("jwt-secret", "bNEPp6H70vPo01yGe5lptraU4N9v005y");

var user = {
    "username": "steeltrace",
    "password": "$2y$10$HNfoo/pvPVwfPUQFu8ljxOsLbOLKcb8JdnAXoTtQztZCz0JvGyF52",
    "2fa": true,
    "totpsecret": null
};

var getBearerToken = function(header, callback) {
    if(header) {
        token = header.split(" ");
        if(token.length == 2) {
            return callback(null, token[1]);
        } else {
            return callback("Malformed bearer token", null);
        }
    } else {
        return callback("Missing authorization header", null);
    }
}

var validateTokenForSecretGeneration = function(request, response, next) {
    getBearerToken(request.headers["authorization"], function(error, token) {
        if(error) {
            return response.status(401).send({ "success": false, "message": error });
        }
        JsonWebToken.verify(token, app.get("jwt-secret"), function(error, decodedToken) {
            if(error) {
                return response.status(401).send({ "success": false, "error": "Invalid authorization token" });
            }
            request.decodedToken = decodedToken;
            next();
        });
    });
}

var validateToken = function(request, response, next) {
    getBearerToken(request.headers["authorization"], function(error, token) {
        if(error) {
            return response.status(401).send({ "success": false, "message": error });
        }
        JsonWebToken.verify(token, app.get("jwt-secret"), function(error, decodedToken) {
            if(error) {
                return response.status(401).send({ "success": false, "error": "Invalid authorization token" });
            }
            if(decodedToken.authorized) {
                request.decodedToken = decodedToken;
                next();
            } else {
                return response.status(401).send({ "success": false, "error": "2FA is required" });
            }
        });
    });
};

app.post("/authenticate", function(request, response) {
    if(!request.body.username) {
        return response.status(401).send({ "success": false, "message": "A `username` is required"});
    } else if(!request.body.password) {
        return response.status(401).send({ "success": false, "message": "A `password` is required"});
    }
    Bcrypt.compare(request.body.password, user.password, function(error, result) {
        console.log(result);
        if(error || !result) {
            return response.status(401).send({ "success": false, "message": "Invalid username and password" });
        }
        var token = JsonWebToken.sign({ "username": user.username, "authorized": !user["2fa"] }, app.get("jwt-secret"), {});
        response.send({"token": token, "2fa": user["2fa"]});
    });
});

app.post("/verify-totp", function(request, response) {
    console.log(user);
    getBearerToken(request.headers["authorization"], function(error, token) {
        if(error) {
            return response.status(401).send({ "success": false, "message": error });
        }
        if(!request.body.otp) {
            return response.status(401).send({ "success": false, "message": "An `otp` is required"});
        }
        JsonWebToken.verify(token, app.get("jwt-secret"), function(error, decodedToken) {
            if(TwoFactor.verifyToken(user.totpsecret, request.body.otp)) {
                decodedToken.authorized = true;
                var token = JsonWebToken.sign(decodedToken, app.get("jwt-secret"), {});
                return response.send({ "token": token });
            } else {
                return response.status(401).send({ "success": false, "message": "Invalid one-time password" });
            }
        });
    });
});

app.get("/generate-secret", validateTokenForSecretGeneration, function(request, response) {
    user.totpsecret = TwoFactor.generateSecret().secret;
    response.send({ "secret": user.totpsecret });
});

app.post("/generate-otp", function(request, response) {
    response.send({ "otp": TwoFactor.generateToken(request.body.secret) });
});

app.get("/protected", validateToken, function(request, response) {
    response.send({ "message": "Welcome to the protected page" });
});

var server = app.listen("3000", function() {
    console.log("Listening on port 3000...");
});