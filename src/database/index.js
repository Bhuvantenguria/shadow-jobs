const {default : mongoose} = require('mongoose');

const connectToDB = async() => {
    const connectionURL = "mongodb+srv://bhuvantenguria37:SHADOW01111@shadowportal.ajhsudz.mongodb.net/"

    mongoose.connect(connectionURL).then(() => console.log("Atlas Database to system is connected Sucessfully ! ")).catch((e) => console.log("le bhai yeh error bhi aagya !"+e))
}

export default connectToDB;