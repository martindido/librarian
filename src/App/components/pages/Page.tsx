import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Segment } from 'semantic-ui-react';

import NewLoading from '../../containers/Loading';
import Header from '../../containers/header/Header';
import logo from '../../images/logo.png';
import '../../styles/Page.css';
import { PageProps } from '../../types/Props/Pages/Page';
import { createPropsGetter } from '../../utils/props';

const SITE_URL = `http://www.librarian.world${process.env.NODE_ENV === 'development' ? ':3000' : ''}`;
const defaultTitle = 'Librarian';

export default class Page extends Component<PageProps> {
    static defaultProps = {
        id: 'page',
        title: defaultTitle,
        image: `${SITE_URL}${logo}`,
        description: 'This is a really awesome website where we can render on the server. Supa cool.',
        contentType: 'website',
        twitter: '@martindido87',
        twitterSite: '@martindido87',
        separator: ' | ',
        schema: 'WebPage',
        className: '',
        isLoading: false,
        isNotFound: false,
        withHeader: true,
        forceLoading: false,
        forceNotFound: false,
        header: {}
    };

    static getProps = createPropsGetter(Page.defaultProps);

    render() {
        const {
            forceLoading,
            isLoading,
            forceNotFound,
            isNotFound,
            children,
            id,
            className,
            schema,
            withHeader,
            header,
            ...rest
        } = Page.getProps(this.props);
        const loading = forceLoading || isLoading;
        const notFound = forceNotFound || isNotFound;
        const finalId = loading ? 'loading' : notFound ? 'not-found' : id;
        const title = loading ? 'Loading...' : notFound ? 'Not Found' : rest.title;

        rest.noCrawl = loading || notFound || rest.noCrawl;
        return (
            <div id={finalId} className={`page ${className}${loading ? ' loading' : ''}`}>
                <Helmet
                    htmlAttributes={{
                        lang: 'en',
                        itemscope: undefined,
                        itemtype: `http://schema.org/${schema}`
                    }}
                    title={title + rest.separator + defaultTitle}
                    meta={this.getMetaTags()}
                />
                {withHeader ? <Header {...header} forceLoading={forceLoading} /> : null}
                {loading ? (
                    <NewLoading />
                ) : withHeader ? (
                    <Segment basic>{notFound ? <p>Not Found</p> : children}</Segment>
                ) : notFound ? (
                    <Segment basic>
                        <p>Not Found</p>
                    </Segment>
                ) : (
                    children
                )}
            </div>
        );
    }

    private getMetaTags() {
        const { title, description, image, noCrawl, published, updated, category, tags, separator } = Page.getProps(
            this.props
        );
        const theTitle = (title + separator + defaultTitle).substring(0, 60);
        const theDescription = description.substring(0, 155);
        const metaTags = [
            {
                itemprop: 'name',
                content: theTitle
            },
            {
                itemprop: 'description',
                content: theDescription
            },
            {
                itemprop: 'image',
                content: image
            },
            {
                name: 'description',
                content: theDescription
            }
        ];

        if (noCrawl) {
            metaTags.push({
                name: 'robots',
                content: 'noindex, nofollow'
            });
        }
        if (published) {
            metaTags.push({
                name: 'article:published_time',
                content: published
            });
        }
        if (updated) {
            metaTags.push({
                name: 'article:modified_time',
                content: updated
            });
        }
        if (category) {
            metaTags.push({
                name: 'article:section',
                content: category
            });
        }
        if (tags) {
            metaTags.push({
                name: 'article:tag',
                content: tags
            });
        }
        return metaTags;
    }
}
