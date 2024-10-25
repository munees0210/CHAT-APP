import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
}, {
    timestamps: true,
});

const Conversation = mongoose.model('Converstion', conversationSchema);

export default Conversation