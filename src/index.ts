export { }

// Add reflow property to window
declare global {
    interface Window {
        reflow: Breakpoint
    }
}

interface Breakpoint {
    current: string
    xs: boolean
    sm: boolean
    md: boolean
    lg: boolean
    xl: boolean

    mobile: boolean
    mobileBreakpoint: number

    thresholds: {
        xs: number,
        sm: number,
        md: number,
        lg: number
    }
}


/**
 * Can access 'reflow' or 'window.reflow' from anywhere.  
 * IIFE for initialization and to avoid polluting global scope.
 * 
 * TODO: make breakpoint thresholds configurable, but only after initialization.
 */
window.reflow = (() => {

    const breakpointInitial: Breakpoint = {
        current: 'xs',
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,

        mobile: false,
        mobileBreakpoint: 1280, // same as md, meaning md or down.

        thresholds: {
            xs: 600,
            sm: 960,
            md: 1280,
            lg: 1920
        }
    }

    // Determine new breakpoint on resize
    window.addEventListener('resize', calculateBreakpoint, { passive: true })

    // Manually initialize for the first load
    return calculateBreakpoint()

    /**
     * Make a new breakpoint object based on current viewport width
     */
    function calculateBreakpoint() {
        // Current viewport width.
        const width = window.innerWidth

        // breakpointInitial is retained in the closure.
        const newBreakpoint = Object.assign({}, breakpointInitial)

        // Destructure newBreakpoint for convenience
        const { mobileBreakpoint, thresholds } = newBreakpoint

        if (width < mobileBreakpoint) {
            newBreakpoint.mobile = true
        }

        if (width < thresholds.xs) {
            newBreakpoint.current = 'xs'
            newBreakpoint.xs = true
        }
        else if (width < thresholds.sm) {
            newBreakpoint.current = 'sm'
            newBreakpoint.sm = true
        }
        else if (width < thresholds.md) {
            newBreakpoint.current = 'md'
            newBreakpoint.md = true
        }
        else if (width < thresholds.lg) {
            newBreakpoint.current = 'lg'
            newBreakpoint.lg = true
        }
        else {
            newBreakpoint.current = 'xl'
            newBreakpoint.xl = true
        }

        window.reflow = newBreakpoint

        return newBreakpoint
    }

})()

