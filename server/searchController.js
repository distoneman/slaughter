module.exports = {

    getCustomerByName: async (req, res) => {
        let name = `%${req.params.name}%`;
        const db = req.app.get('db');
        let response = await db.settings.searchByName({
            name
        });
        res.status(200).send(response)

    },
    getCustomerByPhone: async (req, res) => {
        // console.log('phone')
        let phone = `%${req.params.phone}%`;
        const db = req.app.get('db')
        let response = await db.settings.searchByPhone({
            phone
        })
        res.status(200).send(response)
    },
    getCustomerByStatusDate: async (req, res) => {
        // console.log('date')
        let statusDate = req.query.statusDate;
        // console.log(statusDate)
        const db = req.app.get('db')
        let response = await db.settings.searchByStatusDate({
            statusDate
        })
        res.status(200).send(response)
    }

}