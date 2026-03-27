export const clickOutside = {
    mounted(el, binding) {

        el.clickOutsideEvent = (event) => {
            // Check if the click was outside the element and its children
            if (!(el === event.target || el.contains(event.target))) {
                if (typeof binding.value === 'function') {
                    binding.value(event);
                } else {
                    console.warn(`[v-click-outside] expected a function, got ${typeof binding.value} ${binding.value}`);
                }
            }
        };

        // Attach
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};