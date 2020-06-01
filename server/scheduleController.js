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

}