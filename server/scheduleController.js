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
        const { id, schedDate, animalType, statusDate, cancelledBy } = req.body;
        const db = req.app.get('db');
        let response = await db.settings.cancelSched({
            id, schedDate, animalType, statusDate, cancelledBy
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
            notes, replaceId, schedId } = req.body
        const db = req.app.get('db')
        let response = await db.settings.fillFromWaitlist({
            slotId, schedDate, animalType, custName, custPhone,
            notes, replaceId, schedId
        })
        res.status(200).send(response)
    },
    updateConfirmedStatus: async (req, res) => {
        let { id, schedDate, animalType } = req.body
        const db = req.app.get('db')
        let response = await db.settings.updateConfirmed({ 
            id, schedDate, animalType })
        res.status(200).send(response)
    },
    getSlotId: async(req, res) => {
        // console.log('get slot id')
        let animalType = req.query.animalType;
        let schedDate = req.query.schedDate;
        const db = req.app.get('db')
        let response = await db.settings.getSlotId({
            animalType, schedDate
        })
        res.status(200).send(response)
    },
    updateCustomer: async(req, res) => {
        // console.log('update')
        let {id, custName, custPhone, notes, 
            schedDate, animalType, 
            waitlistFlag} = req.body
        const db = req.app.get('db')
        let response = await db.settings.updateCustomer({
            id, custName, custPhone, notes, 
            schedDate, animalType, waitlistFlag
        })
        res.status(200).send(response)
    },
    deleteAppointment: async(req, res) => {
        let {id, slotId, schedDate, animalType} = req.body
        const db = req.app.get('db')
        let response = await db.settings.deleteAppointment({
            id, slotId, schedDate, animalType
        })
        res.status(200).send(response)
    }
}

// let id = `${req.params.id}`;
// const db = req.app.get('db');
// let response = await db.settings.getOneDay({
//     id
// })
// res.status(200).send(response)
