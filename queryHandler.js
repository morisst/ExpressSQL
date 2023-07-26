async function queryHandler(req, res, next) {
    // console.log(req.query)
    req.db.query(req.query, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: error.message })
            return;
        }
        res.status(200).json({ results})
        return;
    })
}

export default queryHandler