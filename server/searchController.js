module.exports = {

    getCustomerByName: async (req, res) => {
        let name = `%${req.params.name}%`;
        const db = req.app.get('db');
        // console.log(name)
        let response = await db.settings.searchByName({
            name
        });
        res.status(200).send(response)

    }

}