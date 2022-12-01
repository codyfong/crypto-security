const bcrypt = require('bcryptjs')
const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username ) {
          if(bcrypt.compareSync(password, users[i].passwordHash)){
          let userToReturn = users[i]
          delete userToReturn.passwordHash
          res.status(200).send(userToReturn)
          }
        }
      }

      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)

        userObject = {
          username, email, firstName, lastName, passwordHash
        }
        
        users.push(userObject)

        let userToReturn = {...userObject}
        delete userToReturn.passwordHash

        console.log(req.body)
        res.status(200).send(userToReturn)
    }
}

