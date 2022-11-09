const {normalize, schema}  = require('normalizr');
const ContainerMongoDb = require('../../controller/ContainerMongoDb');

/* 
    {
        authors: { 
            id: "mail",
            name: "",
            lastname: "",
            age: "",
            alias: "",
            avatar: ""
        },
        text: "messages",
    }
*/

const requiredFields = ['email','name','lastname','age','alias','avatar','text'];

class messagesDAOMongo extends ContainerMongoDb {

    constructor() {
        
        super('messages', {
            authors: { 
                id: { type: String, required: true },
                name: { type: String, required: true },
                lastname: { type: String, required: true },
                age: { type: String, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true }
            },
            text: { type: String, required: true }
        })
    }

    getAllMessages() {
        const messages = this.listAll();
        if (messages.wasError){
            return {wasError: true, data: messages.data} 
        }
        const authorSchema = new schema.Entity('authors',{},{idAtribute: 'email'});
        const textSchema = new schema.Entity('text');
        const postSchema = new schema.Entity('posts',{
            author: authorSchema,
            text: [textSchema]
        });
        const normalizedData = normalize(messages.data || {}, postSchema);
        console.log(normalizedData)
        return {wasError: false, data: normalizedData}
    }
    insertMessages(data) {
        requiredFields.forEach((element) => {
            if(data[element] === undefined) {
                return {wasError: true, data: `${data[element]} undefined, field is required`}; 
        }})
        const {email,name,lastname,age,alias,avatar,text} = data;
        const message = {
            author:{
                id: email,
                name,
                lastname,
                age,
                alias,
                avatar
            },
                text
            }
        this.save(message);
        const messages = this.listAll();
        if (messages.wasError){
            return {wasError: true, data: messages.data} 
        }
        const authorSchema = new schema.Entity('authors');
        const textSchema = new schema.Entity('text');
        const postSchema = new schema.Entity('posts',{
            author: authorSchema,
            text: [textSchema]
        });
        const normalizedData = normalize(messages.data || {}, postSchema);
        console.log(normalizedData)
        return {wasError: false, data: normalizedData}
    }
}

module.exports = messagesDAOMongo