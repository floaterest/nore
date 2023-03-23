import type { PageLoad } from './$types';

export const load = (async ({fetch}) => ({fetch})) satisfies PageLoad;
