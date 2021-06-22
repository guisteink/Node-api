const express = require('express')
const router = express.Router()
const database = require('../../clients.mock')

/** Get all clients */
router.get('/', (req, res, next) => {
    try {
        const clients = database.map(client => client)
            .sort(function (a, b) {
                return parseFloat(a._id) - parseFloat(b._id);
            })
        if (clients)
            return res.status(200).json(clients)
        else
            return res.status(404).json({ error: 'Clients not found' })

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

/** Get client by name */
router.get("/name/:name", (req, res, next) => {
    try {
        const search = req.params.name
        const client = database.find(client => client.name == search)
        if (client)
            return res.status(200).json(client)
        else
            return res.status(404).json({ error: 'Client not found' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/totals', (req, res, next) => {
    try {
        const enterprises = database.map(client => (client.enterprises.length))
        const realties = database.map(client => client.enterprises.map(enterprise => { return parseInt(enterprise.realties) }))
        const totalRealties = realties.reduce(
            function (a, b) {
                return a.map(
                    function (v, i) {
                        return v + b[i];
                    });
            });
        const totalEnterprises = enterprises.reduce((a, b) => {
            return a + b
        })
        const totalClients = database.map(client => client).length
        return res.status(200).json({
            clients: totalClients,
            enterprises: totalEnterprises,
            realties: totalRealties
        })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

/** Get client totals */
router.get("/:client_id/totals", (req, res, next) => {
    try {
        const search = req.params.client_id
        const client = database.find(client => client._id == search)
        if (client) {
            const countEnterprises = client.enterprises.length
            const countRealties = client.enterprises.map(enterprise => { return parseInt(enterprise.realties) })
            const sum = countRealties.reduce((a, b) => {
                return a + b
            })

            return res.status(200).json(
                {
                    "totalEnterprises": countEnterprises,
                    "totalRealties": sum
                }
            )
        }
        else
            return res.status(404).json({ error: 'Client not found' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/:client_id/enterprise', (req, res, next) => {
    try {
        const search = req.params.client_id
        const client = database.find(client => client._id == search)
        if (client) {
            const enterprise = client.enterprises
                .sort(function (a, b) {
                    return parseFloat(a._id) - parseFloat(b._id)
                })
            return res.status(200).json(enterprise)
        }
        else
            return res.status(404).json({ error: 'Enterprises not found' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:client_id/enterprise/name/:name', (req, res, next) => {
    const searchClient = req.params.client_id
    const searchEnterprise = req.params.name
    try {
        const client = database.find(client => client._id == searchClient)
        if (client) {
            const enterprise = client.enterprises.find(e => e.name == searchEnterprise)
            if (enterprise)
                return res.status(200).json(enterprise)
            else
                return res.status(404).json({ error: 'Enterprise not found' })
        }
        else
            return res.status(404).json({ error: 'Client not found' })

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:client_id', (req, res, next) => {
    const search = req.params.client_id
    try {
        const client = database.find(client => client._id == search)
        if (client)
            return res.status(200).json(client)
        else
            return res.status(404).json({ error: 'Client not found' })
    } catch (error) {
        return res.status(500).json({ error: 'Server Internal Error' })
    }
})

router.get('/enterprise/all', (req, res, next) => {
    try {
        const enterprises = []
        database.map(client => (
            client.enterprises.map(enterprise => enterprises.push(enterprise))
        ))
        const newEnterprises = [...new Set(enterprises)]
            .sort(function (a, b) {
                return parseFloat(a._id) - parseFloat(b._id);
            })
        if (newEnterprises)
            return res.status(200).json(newEnterprises)
        else
            return res.status(404).json({ error: 'Enterprises not found' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/enterprise/:id', (req, res, next) => {
    try {
        const search = req.params.id
        database.map(client => {
            const enterprise = client.enterprises.find(enterprise => enterprise._id == search)
            if (enterprise)
                return res.status(200).json(enterprise)
        })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/enterprise/name/:name', (req, res, next) => {
    try {
        const search = req.params.name
        database.map(client => {
            const enterprise = client.enterprises.find(enterprise => enterprise.name == search)
            if (enterprise)
                return res.status(200).json(enterprise)
        })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/enterprise/:id/totals', (req, res, next) => {
    try {
        const search = req.params.id
        database.map(client => {
            const enterprise = client.enterprises.find(enterprise => enterprise._id == search)
            if (enterprise)
                return res.status(200).json({ "totalRealties": enterprise.realties })
        })
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})



module.exports = router