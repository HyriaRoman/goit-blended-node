import { Schema, model } from 'mongoose';

export const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.pre('save', function() {
  if (!this.name) {
    this.name = this.email;
  }
});

usersSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.index({ email: 1 });

export const Users = model('Users', usersSchema);
