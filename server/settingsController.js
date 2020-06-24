module.exports = {
    years: async (req, res) => {
        let animalType = `${req.params.animalType}`;
        // console.log(animalType)
        const db = req.app.get('db');
        let response = await db.settings.years({
            animalType
        })
        res.status(200).send(response)
    },
    getDailyDetail: async (req, res) => {
        // console.log('Daily Detail')
        // console.log(req.params)
        let animalType = `%${req.params.animalType}%`;
        let month = `${req.params.month}`;
        let year = `${req.params.year}`;
        const db = req.app.get('db');
        let response = await db.settings.dailyDetail({
            animalType,
            month,
            year 
        })
        res.status(200).send(response)
    },
    getMonthlyDefault: async (req, res) => {
        // console.log("default")
        let animalType = req.params.animalType
        let month_num = req.params.month
        const db = req.app.get('db')
        let response = await db.settings.defaults({
            animalType, month_num
        })
        res.status(200).send(response)
    },
    addSlots: async (req, res) => {
        // console.log(req.body)
        const {slot_date, animal_type, max_slots} = req.body;
        const db = req.app.get('db')
        let response = await db.settings.addSlots({
            slot_date, animal_type, max_slots
        })
        res.status(200).send(response)
    },
    getOneDaySlots: async (req, res) => {
        // console.log('get one day slots')
        // console.log(req.query)
        const schedDate = req.query.schedDate;
        const db = req.app.get('db')
        let response = await db.settings.getOneDaySlots({
            schedDate
        })
        res.status(200).send(response)
    },
    updateSlots: async (req, res) => {
        const { beefId, beefMax, porkId, porkMax,
            sheepId, sheepMax } = req.body;
        const db = req.app.get('db')
        let response = await db.settings.updateSlots({
            beefId, beefMax, porkId, porkMax, sheepId, sheepMax
        })
        res.status(200).send(response)
    },
    getSlotDefaultByMonth: async (req, res) => {
        // console.log('get slot defaults')
        let month_num = req.params.month
        const db = req.app.get('db')
        let response = await db.settings.getSlotDefaultsByMonth({
            
        })
        res.status(200).send(response)
       
    }
}