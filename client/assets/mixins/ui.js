import { createNamespacedHelpers } from 'vuex';

const { mapActions: mapModalActions } = createNamespacedHelpers('ui/modals');

const UIMixin = {
  computed: {
    $ui () {
      return {
        modal: {
          open: this._shUIModalOpen,
          close: this._shUIModalClose,
          target: this._shUIModalTarget,
        },
        get blade () {
          return this.modal;
        },
      };
    },
  },
  methods: {
    ...mapModalActions({
      _shUIModalOpen: 'open',
      _shUIModalClose: 'close',
      _shUIModalTarget: 'target',
    }),
  },
};

export default UIMixin;
