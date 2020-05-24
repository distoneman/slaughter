module.exports = {
    years: async (req, res) => {
        let animalType = `${req.params.animalType}`;
        console.log(animalType)
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
        console.log("default")
        let animalType = req.params.animalType
        let month_num = req.params.month
        const db = req.app.get('db')
        let response = await db.settings.defaults({
            animalType, month_num
        })
        res.status(200).send(response)
    }
}