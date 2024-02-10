const {GraphQLError} = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'dfvlshdkhlrghkdghkdfhkjfhkjfhkjgkjddhhddkjsfjosjfsfkjsdvjskdgkjdj';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    signToken: function ({email, role, _id}) {
        const payload = {email, role, _id};
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
};

