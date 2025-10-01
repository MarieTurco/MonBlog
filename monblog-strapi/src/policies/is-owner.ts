import { errors } from '@strapi/utils';
const { PolicyError } = errors;

export default async function isOwner(ctx, config, { strapi }) {
  const { id } = ctx.params;
  const user = ctx.state.user;

  const article = await strapi.documents('api::article.article').findOne({
    documentId: id,
    populate: { users_permissions_user: true },
  }
);

  if (!article || article.users_permissions_user?.id !== user.id) {
    throw new PolicyError('Vous ne pouvez modifier que vos propres articles', {
      policy: 'is-owner',
      articleId: id,
    });
  }

  return true;
}
