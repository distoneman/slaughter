module.exports = {
    getAvailable: async (req, res) => {
        let id = `${req.params.id}`;
        // console.log(id)
        const db = req.app.get('db');
        let response = await db.settings.getAvailable({
            id
        })
        res.status(200).send(response)
    },
    addSchedule: async (req, res) => {
        // console.log('add schedule');
        // console.log(req.body)
        const {slotId, schedDate, animalType, custName,
            custPhone, schedStatus, changeDate, waitList,
            notes} = req.body
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
        // console.log(id)
        const db = req.app.get('db');
        let response = await db.settings.getOneDay({
            id
        })
        res.status(200).send(response)
    },
    getScheduleByDate: async (req, res) => {
        let schedDate = req.query.schedDate;
        let animalType = req.query.animalType;
        // console.log(schedDate)
        // console.log(animalType)
        const db = req.app.get('db');
        let response = await db.settings.getScheduleByDate({
            schedDate, animalType
        })
        res.status(200).send(response)
    }
}