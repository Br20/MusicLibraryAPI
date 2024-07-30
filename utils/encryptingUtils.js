import bcrypt from "bcrypt";
const saltRounds = 10;

export const encrypt = (pass) => {
        bcrypt.hash(pass, saltRounds)
        .then(encrypted =>  encrypted)
        .catch( () => null)
}

export const compare = (pass, hashedPass) => {
    return bcrypt.compare(pass, hashedPass)
}