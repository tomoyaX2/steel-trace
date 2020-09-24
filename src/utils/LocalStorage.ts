

class LocalStorage {
    static setItem = async (name, item) => {
        await localStorage.setItem(name, item)
    }
}


export default LocalStorage