export const loadFromLocalStorage = () => {
    try {
        const maxValue = localStorage.getItem('maxValue')
        const startValue = localStorage.getItem('startValue')
        const counter = localStorage.getItem('counter')

        return {
            maxValue: maxValue ? JSON.parse(maxValue) : 0,
            startValue: startValue ? JSON.parse(startValue) : 0,
            counter: counter ? JSON.parse(counter) : 0
        }
    } catch (e) {
        return undefined
    }
}