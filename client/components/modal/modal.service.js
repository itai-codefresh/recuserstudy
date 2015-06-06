'use strict';

angular.module('recuserstudyApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        backdrop: 'static',
        keyboard: false,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        info: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                title = args.shift(),
                html = args.shift(),
                continueText = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: title,
                html: html,
                buttons: [{
                  classes: 'btn-primary',
                  text: continueText,
                  click: function(e) {
                    deleteModal.dismiss(e);
                    del.apply(event, args);
                  }
                }]
              }
            }, 'modal-primary');

          };
        },

        confirm: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              title = args.shift(),
              html = args.shift(),
              continueText = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: title,
                html: html,
                buttons: [{
                  classes: 'btn-primary',
                  text: continueText,
                  click: function(e) {
                    deleteModal.dismiss(e);
                    del.apply(event, args);
                  }
                },
                  {
                    classes: 'btn-default',
                    text: 'I want to make changes',
                    click: function(e) {
                      deleteModal.dismiss(e);
                    }
                  }]
              }
            }, 'modal-primary');

          };
        }
      }
    };
  });
