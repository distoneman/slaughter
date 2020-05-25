module.exports = {
    getAvailable: async (req, res) => {
        let id = `${req.params.id}`;
        console.log(id)
        const db = req.app.get('db');
        let response = await db.settings.getAvailable({
            id
        })
        res.status(200).send(response)
    },
  
}