class EventProxy {
    constructor() {
        this.listenList = {}
    }

    on(type, selector, callback, nameSpace = '') {
        let id = type + '_' + Math.floor(Math.random() * 999999),
            domList = [...document.querySelectorAll(selector)],
            action = (e) => {
                for (let dom of domList) {
                    if (dom === e.target) {
                        callback(e)
                    }
                }
            }
        
        if (type in this.listenList) {
            this.listenList[type].push({
                id,
                action,
                nameSpace
            })
        } else {
            this.listenList[type] = [{
                id,
                action,
                nameSpace
            }]
        }

        this.bindEvent(type)

        return id
    }

    off(eventId) {
        let type = eventId.split('_')[0],
            onType = 'on' + type
        
        for (let item of this.listenList[type] ) {
            if (item.id === eventId) {
                item.id = undefined
                break
            }
        }
        this.removeListen(type)
        this.bindEvent(type)
    }

    bindEvent(type) {
        let onType = 'on' + type
        document[onType] = (e) => {
            for (let item of this.listenList[type]) {
                item.action(e)
            }
        }
    }

    removeListen(type) {
       this.listenList[type] = this.listenList[type].filter(v => v.id)
    }

    clear(nameSpace) {
        if (nameSpace) {
            for (let type in this.listenList) {
                let list = this.listenList[type]
                for (let item of list) {
                    if (item.nameSpace === nameSpace) {
                        item.id = undefined
                    }
                }
                this.removeListen(type)
                this.bindEvent(type)
            }
        } else {
            for (let type in this.listenList) {
                let onType = 'on' + type
                document[onType] = null
                delete this.listenList[type]
            }
        }
    }
}

export default EventProxy