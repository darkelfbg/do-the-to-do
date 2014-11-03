"use strict";

/*
 *  Service to manage all request sent to the RAL API for user management
 */
angular.module("adminUiApp")
    .factory("UserManagementService", ["$http", "$q", function ($http, $q) {

        // TODO: remove caching after we begin using the API or do it in a better way if needed
        var cachedData = null;

        /*
         *  Load the data and cache it
         */
        function loadData() {
            var deferred = $q.defer();

            if (cachedData != null) {
                deferred.resolve(cachedData);
            } else {
                $http({
                    method: "GET",
                    url: "mockdata/projects.json"
                }).success(function (data) {
                    cachedData = data;
                    deferred.resolve(cachedData);
                }).error(function (data, status) {
                    cachedData = [];
                    deferred.reject({
                        status: status,
                        data: data
                    });
                });
            }

            return deferred.promise;
        }

        /*
         *  Get the users for the user list  
         */
        function getProjects() {
            var deferred = $q.defer();

            loadData().then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /*
         *  Get a user's full data by a given ID
         */
        function getProjectsById(id) {
            var deferred = $q.defer();

            if (String(parseInt(id)) !== String(id)) {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: Invalid user ID!"
                });
            } else {
                loadData().then(function (data) {
                    var res = Enumerable.from(data).singleOrDefault(function (e) {
                        return String(e.id) === String(id);
                    }, null);

                    if (res) {
                        deferred.resolve(angular.copy(res));
                    } else {
                        deferred.reject({
                            status: 400,
                            data: "Bad Request: Invalid user ID!"
                        });
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }

            return deferred.promise;
        }

        /*
         *  Create a user by putting it in the cache
         */
        // TODO: revise when we begin using the API
        function createProject(user) {
            var deferred = $q.defer();
            
            if (user.username != null && user.emailAddress != null) {
                loadData().then(function (data) {
                    user.id = data.length > 0 ? parseInt(data[data.length - 1].id) + 1 : 0;
                    cachedData.push(user);
    
                    deferred.resolve(user);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                deferred.reject({
                    status: 400,
                    data: "Bad Request: data is wrong."
                });
            }

            return deferred.promise;
        }

        /*
         *  Edit user by getting current user data and changing it after user input
         */
        // TODO: revise when we begin using the API
        function editProject(id, user) {
            var deferred = $q.defer();

            if (user.username != null && user.emailAddress != null && id != null) {

                loadData().then(function (data) {
                    var currentUser = Enumerable.from(data).singleOrDefault(function(e) {
                        return String(e.id) === String(id);
                    }, null);

                    if (!currentUser) {
                        deferred.reject({
                            status : 400,
                            data : "Bad Request: Invalid user ID!"
                        });
                    } else {
                        angular.extend(currentUser, user);
                        deferred.resolve(currentUser);
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            } else {
                deferred.reject({
                    status : 400,
                    data : "Bad Request: invalid user input."
                });
            }

            return deferred.promise;
        }

         /*
         *  Delete user by id
         */
        // TODO: revise when we begin using the API
        function deleteProject(id) {
             var deferred = $q.defer();

            if (String(parseInt(id)) !== String(id)) {
                deferred.reject({
                    status : 400,
                    data : "Bad Request: Invalid entity ID!"
                });
            } else {
                loadData().then(function (data) {
                    var eData = Enumerable.from(data);
                    var index = eData.indexOf(eData.singleOrDefault(function(e) {
                        return String(e.id) === String(id);
                    }, null));

                    if (index > -1) {
                        data.splice(index, 1);
                        deferred.resolve();
                    } else {
                        deferred.reject({
                            status : 400,
                            data : "Bad Request: Invalid entity ID!"
                        });
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            }

            return deferred.promise;
        }

        return {
            getProjects: getProjects,

            getUProjectById: getProjectById,

            createProject: createProject,

            editProject: editProject,

            deleteProject: deleteProject
        };
    }]);