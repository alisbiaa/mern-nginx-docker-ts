import {model, Schema} from "mongoose";

export interface ITutorial{
    title: string;
    description: string;
    published: boolean;
}

const schema = new Schema<ITutorial>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    published: {type: Boolean, required: true},
}, {timestamps: true});

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const tutorial_model = model<ITutorial>("tutorial", schema);
export default tutorial_model;
