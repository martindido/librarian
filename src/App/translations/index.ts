import { renderToStaticMarkup } from 'react-dom/server';

import languages from './languages.json';
import translation from './translation.json';

const options = { renderToStaticMarkup };

export { languages, translation, options };
