export function docReady(executeFn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available 10 ms
        setTimeout(executeFn, 10);
    } else {
        document.addEventListener("DOMContentLoaded", executeFn);
    }
}  