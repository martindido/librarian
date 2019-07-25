import slugify from 'slugify';

export default (s: string, options = { lower: true }) => slugify(s, options);
