import formatErrors from '../formatErrors';

export default {
    Query: {
        allUsers: () => (parent, args, { models }) => models.User.findAll({ raw: true }),
    },
    Mutation: {
        register: async (parent, args, { models }) => {
            try {
                const user = await models.User.create(args);

                return {
                    ok: true,
                    user,
                };
            } catch (err) {
                console.log('Mutation_Register', err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        },
    },
};
