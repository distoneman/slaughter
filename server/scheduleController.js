module.exports = {
    getAvailable: async (req, res) => {
                let id = `${req.params.id}`;
const db = req.app.get('db');
        let response = await db.settings.getAvailable({
            id
        })
        res.status(200).send(response)
    },
    addSchedule: async (req, res) => {
        const { slotId, schedDate, animalType, custName,
            custPhone, schedStatus, changeDate, waitList,
            notes } = req.body
        const db = req.app.get('db');
        let response = await db.settings.addSchedule({
            slotId, schedDate, animalType, custName,
            custPhone, schedStatus, changeDate,
            waitList, notes
        });
        res.status(200).send()
    },
    getOneDay: async (req, res) => {
        let id = `${req.params.id}`;
        const db = req.app.get('db');
        let response = await db.settings.getOneDay({
            id
        })
        res.status(200).send(response)
    },
    getScheduleByDate: async (req, res) => {
        let schedDate = req.query.schedDate;
        let animalType = req.query.animalType;
        const db = req.app.get('db');
        let response = await db.settings.getScheduleByDate({
            schedDate, animalType
        })
        res.status(200).send(response)
    },
    cancelSched: async (req, res) => {
        const { id, slotId, schedDate, animalType, statusDate, cancelledBy } = req.body;
        const db = req.app.get('db');
        let response = await db.settings.cancelSched({
            id, slotId, schedDate, animalType, statusDate, cancelledBy
        })
        res.status(200).send(response)
    },
    getWaitlist: async (req, res) => {
        let schedDate = req.query.schedDate;
        let animalType = req.query.animalType;
        const db = req.app.get('db');
        let response = await db.settings.getWaitlst({
            schedDate, animalType
        })
        res.status(200).send(response)
    },
    fillFromWaitlist: async (req, res) => {
        const { slotId, schedDate, animalType, custName, custPhone,
            notes, replaceId, OldSlotId, schedId } = req.body
        const db = req.app.get('db')
        let response = await db.settings.fillFromWaitlist({
            slotId, schedDate, animalType, custName, custPhone,
            notes, replaceId, OldSlotId, schedId
        })
        res.status(200).send(response)
    },
    updateConfirmedStatus: async (req, res) => {
        let { id, schedDate, animalType } = req.body
        const db = req.app.get('db')
        let response = await db.settings.updateConfirmed({
            id, schedDate, animalType
        })
        res.status(200).send(response)
    },
    getSlotId: async (req, res) => {
        // console.log('get slot id')
        let animalType = req.query.animalType;
        let schedDate = req.query.schedDate;
        const db = req.app.get('db')
        let response = await db.settings.getSlotId({
            animalType, schedDate
        })
        res.status(200).send(response)
    },
    updateCustomer: async (req, res) => {
        // console.log('update')
        // console.log(req.body)
        let { id, custName, custPhone, notes,
            schedDate, animalType,
            waitlistFlag, schedStatus, rescheduledFlag, slotId } = req.body
        const db = req.app.get('db')
        let response = await db.settings.updateCustomer({
            id, custName, custPhone, notes,
            schedDate, animalType, waitlistFlag, schedStatus
        })
        if (rescheduledFlag === true) {
            // console.log('rescheduled is true')
            // console.log(slotId)
            let response2 = await db.settings.unCancel({ slotId })
        }
        res.status(200).send(response)
    },
    deleteAppointment: async (req, res) => {
        let { id, slotId, schedDate, animalType } = req.body
        const db = req.app.get('db')
        let response = await db.settings.deleteAppointment({
            id, slotId, schedDate, animalType
        })
        res.status(200).send(response)
    },
    addToAltList: async (req, res) => {
        // console.log("add to alt list")
        let { addDate, animalType, totalAnimals, custName,
            custPhone, notes } = req.body
        const db = req.app.get('db')
        let response = await db.settings.addAltList({
            addDate, animalType, totalAnimals, custName,
            custPhone, notes
        })
        res.status(200).send(response)
    },
    removeFromAltList: async (req, res) => {
        // console.log("remove from alt list")
        let {id, searchAnimalType} = req.body
        const db  = req.app.get('db')
        let response = await db.settings.removeFromAltList({id,
            searchAnimalType})
        res.status(200).send(response)
    },
    getAltList: async (req, res) => {
        // console.log("get alt list")
        let animalType = `${req.params.searchAnimalType}`
        const db = req.app.get('db')
        // console.log(animalType)
        let response = await db.settings.getAltList({animalType})
        res.status(200).send(response)
    }
}

