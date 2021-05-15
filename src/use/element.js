import { MessageBox } from 'element-ui'

export const useElement = () => {
  return {
    /**
     * Can be used for both composition API and option API
     *
     * @param {*} options Confirm box options
     * @param {*} success Callback function onsuccess
     * @param {*} fail Callback function oncancel
     */
    confirmAction(
      options = {
        title: 'Are you sure?',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      },
      success = () => {},
      fail = () => {}
    ) {
      MessageBox.confirm(options.title, 'Warning', {
        confirmButtonText: options.confirmButtonText,
        cancelButtonText: options.cancelButtonText,
        type: 'warning'
      }).then(success).catch(fail)
    }
  }
}
