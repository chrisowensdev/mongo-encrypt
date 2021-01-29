const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const encrypt = require('mongoose-encryption');

const demoSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    parentForm: {
        rider: {
            firstName: {
                type: String,
                default: '',
            },
            lastName: {
                type: String,
                default: '',
            },
            email: {
                type: String,
                default: '',
            },
            phone: {
                home: {
                    type: String,
                    default: '',
                },
                cell: {
                    type: String,
                    default: '',
                },
            },
        },
    },
});

demoSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

demoSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

demoSchema.plugin(encrypt, {
    encryptionKey: process.env.ENCKEY,
    signingKey: process.env.SIGKEY,
    encryptedFields: ['parentForm'],
});

const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
