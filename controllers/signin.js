const handleSignin = (db, bcrypt) => (req, res) => { //* advanced functions. A function returns another function
    const { email, password } = req.body;
        db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash, function (err, response) {
                if (err) {
                    console.error("Error found:");
                }
                if (response) {
                    // console.log('Passwords match');
                    return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    }).catch(err => res.status(400).json('unable to get user'))
                } else {
                    // console.log('Passwords do not match');
                    res.status(400).json('Wrong credentials');
                }
            });
        })
        .catch(err => res.status(500).json('Wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}