(function () {
    app.controller('UserController', UserController);

    UserController.$inject = ['$scope', 'ListService', 'DataService'];

    function UserController($scope, ListService, DataService) {
        var vm = this;

        $scope.permissionOptions = DataService.getPermissionOptions();

        $scope.new_account_suffix = '';
        $scope.new_exclude_usernames_from_authentication = '';

        $scope.remove_account_suffix = function (index) {
            $scope.option.account_suffix = ListService.removeListItem(index, $scope.option.account_suffix);
        };

        $scope.add_account_suffix = function (newItem) {
            $scope.option.account_suffix = ListService.addListItem(newItem, $scope.option.account_suffix);
            $scope.new_account_suffix = "";
        };

        $scope.remove_exclude_usernames_from_authentication = function (index) {
            $scope.option.exclude_usernames_from_authentication = ListService.removeListItem(index, $scope.option.exclude_usernames_from_authentication);
        };

        $scope.add_exclude_usernames_from_authentication = function (newItem) {
            $scope.option.exclude_usernames_from_authentication = ListService.addListItem(newItem, $scope.option.exclude_usernames_from_authentication);
            $scope.new_exclude_usernames_from_authentication = "";
        };

        $scope.$on('options', function (event, data) {
            $scope.option = {
                account_suffix: $valueHelper.findValue("account_suffix", data, "").split(";"),
                exclude_usernames_from_authentication: $valueHelper.findValue("exclude_usernames_from_authentication", data, "").split(";"),
                append_suffix_to_new_users: $valueHelper.findValue("append_suffix_to_new_users", data),
                auto_create_user: $valueHelper.findValue("auto_create_user", data),
                auto_update_user: $valueHelper.findValue("auto_update_user", data),
                auto_update_description: $valueHelper.findValue("auto_update_description", data),
                default_email_domain: $valueHelper.findValue("default_email_domain", data),
                prevent_email_change: $valueHelper.findValue("prevent_email_change", data),
                duplicate_email_prevention: $valueHelper.findValue("duplicate_email_prevention", data),
                name_pattern: $valueHelper.findValue("name_pattern", data),
                show_user_status: $valueHelper.findValue("show_user_status", data)
            };

            $scope.permission = {
                account_suffix: $valueHelper.findPermission("account_suffix", data),
                exclude_usernames_from_authentication: $valueHelper.findPermission("exclude_usernames_from_authentication", data),
                append_suffix_to_new_users: $valueHelper.findPermission("append_suffix_to_new_users", data),
                auto_create_user: $valueHelper.findPermission("auto_create_user", data),
                auto_update_user: $valueHelper.findPermission("auto_update_user", data),
                auto_update_description: $valueHelper.findPermission("auto_update_description", data),
                default_email_domain: $valueHelper.findPermission("default_email_domain", data),
                prevent_email_change: $valueHelper.findPermission("prevent_email_change", data),
                duplicate_email_prevention: $valueHelper.findPermission("duplicate_email_prevention", data),
                name_pattern: $valueHelper.findPermission("name_pattern", data),
                show_user_status: $valueHelper.findPermission("show_user_status", data)
            };
        });

        $scope.$on('validation', function (event, data) {
            $scope.messages = {
                account_suffix: $valueHelper.findMessage("account_suffix", data),
                exclude_usernames_from_authentication: $valueHelper.findMessage("exclude_usernames_from_authentication", data),
                append_suffix_to_new_users: $valueHelper.findMessage("append_suffix_to_new_users", data),
                auto_create_user: $valueHelper.findMessage("auto_create_user", data),
                auto_update_user: $valueHelper.findMessage("auto_update_user", data),
                auto_update_description: $valueHelper.findMessage("auto_update_description", data),
                default_email_domain: $valueHelper.findMessage("default_email_domain", data),
                prevent_email_change: $valueHelper.findMessage("prevent_email_change", data),
                duplicate_email_prevention: $valueHelper.findMessage("duplicate_email_prevention", data),
                name_pattern: $valueHelper.findMessage("name_pattern", data),
                show_user_status: $valueHelper.findMessage("show_user_status", data)
            };
        });

        $scope.getPreparedOptions = function () {
            var data = DataService.cleanOptions($scope.option);
            data['account_suffix'] = ListService.parseListArrayToString($scope.option.account_suffix);
            data['exclude_usernames_from_authentication'] = ListService.parseListArrayToString($scope.option.exclude_usernames_from_authentication);
            return data;
        };

        $scope.containsErrors = function () {
            return (!$arrayUtil.containsOnlyNullValues($scope.messages));
        };
    }
})();