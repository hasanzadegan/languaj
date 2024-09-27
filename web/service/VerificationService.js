app.service('VerificationService', function (HttpService) {
    return {
        add: function ($path,$scope) {
            return HttpService.post($path.actions.verification.add, $scope.form);
        },
        verifyCode: function ($path,$scope) {
            return HttpService.post($path.actions.verification.verifyCode, $scope.form);
        },
    }
});