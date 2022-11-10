const {normalize, schema}  = require('normalizr');
const ContainerMongoDb = require('../../containers/ContainerMongoDb');
const Chat = require('./Chat');
const util = require('util');

const requiredFields = ['email','name','lastname','age','alias','avatar','text'];

class messagesDAOMongo extends ContainerMongoDb {

    constructor() {
        
        super('messages', {
            author: { 
                id:  String,
                name: String,
                lastname: String,
                age: String,
                alias: String,
                avatar: String,
            },
            text: String,
            created_at: {
                type: Date,
                default: Date.now()
            }
        })
    }

    async getAllMessages() {
        const messages = await this.listAll();
        // const messages2 = await messages.map(message => {
        //     return {...message, _id: `${message._id.toString()}`} 
        // })
        console.log('messages', messages)
        // console.log('messages2', messages2)
        if (messages.wasError){
            return {wasError: true, data: messages} 
        }
        const data = {
            id : "mensajes",
            post: messages
        }
        const authorSchema = new schema.Entity('author');
        const textSchema = new schema.Entity('text');
        
        const commentSchema = new schema.Entity('comment', {
            author: authorSchema,
            text: [textSchema]
        });
        const postSchema = new schema.Entity('post',{
            author: authorSchema,
            post: [commentSchema]
        })
        const normalizedData = normalize(data, postSchema)
        const util = require('util')
        // console.log(normalizedData);
        // console.log(util.inspect(normalizedData,false,12,true))
        return {wasError: false, data: normalizedData};
    }

    async insertMessages(data) {
        requiredFields.forEach((element) => {
            if(data[element] === undefined) {
                return {wasError: true, data: `${data[element]} undefined, field is required`}; 
        }})
        const {id,name,lastname,age,alias,avatar,text} = data;
        const newMsg = new Chat({
            author: { 
                id,
                name,
                lastname,
                age,
                alias,
                avatar,
            },
            text
        })
        await this.save(newMsg);
        return {wasError: false, data: 'guardado ok'};
    }
}

module.exports = messagesDAOMongo