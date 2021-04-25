import {toast} from 'react-toastify'

export const toastFunc = (type, message) => {
    return toast[type](message)
}