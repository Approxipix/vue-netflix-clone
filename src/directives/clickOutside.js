export default {
  bind: (element, binding, vnode) => {
    element.clickOutsideEvent = event => {
      if (!(element === event.target || element.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent)
  },
  unbind: element => {
    document.body.removeEventListener('click', element.clickOutsideEvent)
  },
}
