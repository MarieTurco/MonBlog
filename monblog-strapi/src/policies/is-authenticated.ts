import { errors } from '@strapi/utils';
const { PolicyError } = errors;

export default async function isAuthenticated(ctx, config, { strapi }) {
  if (ctx.state.user) {
    return true;
  }

  throw new PolicyError('Vous devez être connecté pour accéder à cette route', {
    policy: 'is-authenticated',
  });
}
