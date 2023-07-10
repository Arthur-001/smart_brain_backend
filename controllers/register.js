const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    function isPasswordValid(password) {
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(){}[\].,?\\` ]/.test(password);
        const isLengthValid = password.length >= 8;
      
        return (
          hasLowerCase &&
          hasUpperCase &&
          hasNumber &&
          hasSpecialChar &&
          isLengthValid
        );
    }

    if (email && name && password) {
        if (isPasswordValid(password)) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, null, function (err, hash) {
                    if (err) {
                        res.status(500).json('Error registering user');
                    }
                    db.transaction(trx => {
                        trx.insert({
                            hash: hash,
                            email: email.toLowerCase()
                        })
                            .into('login')
                            .returning('email')
                            .then(loginEmail => {
                                trx('users')
                                    .returning('*')
                                    .insert({
                                        name: name,
                                        email: loginEmail[0].email,
                                        joined: new Date()
                                    })
                                    .then(user => {
                                        res.json(user[0]);
                                    })
                            })
                            .then(trx.commit)
                            .catch(err => res.status(500).json('error registering user'))
                    })
                    // .catch(error => res.status(400).json('unable to register'))
                });
            });
        } else {
            res.json('password is weak')
        }
    } else {
        res.send(false)
    }
}

module.exports = {
    handleRegister: handleRegister
}