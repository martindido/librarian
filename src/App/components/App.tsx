import React, { Component } from 'react';

import { isServer } from '../../store';
import Routes from '../containers/Routes';
import '../styles/App.css';
import * as translations from '../translations';
import { Language } from '../types/Locale';
import { AppProps } from '../types/Props/App';
import { AuthenticateSync } from '../types/Sync';
import createLogger from '../utils/logger';

const logger = createLogger(['components', 'app']);

export default class App extends Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
        this.props.initialize(translations);
    }

    public componentDidMount = async () => {
        if (!isServer) {
            try {
                await this.onDidMount();
            } catch (error) {
                logger.error(error);
            }
        }
    }

    private onDidMount = async () => {
        const authenticate = this.authenticate();
        const setCurrentLanguage = this.setCurrentLanguage();

        return {
            authenticate: await authenticate,
            setCurrentLanguage: await setCurrentLanguage
        };
    }

    private authenticate = async (payload: AuthenticateSync = {}) => {
        return await new Promise((resolve, reject) => {
            this.props.authenticateSync(payload, {
                onSuccess: resolve,
                onError: reject
            });
        });
    }

    private setCurrentLanguage = async () => {
        const language = await this.getCurrentLanguage();

        this.props.setActiveLanguage(language);
    }

    private getCurrentLanguage = async () => {
        return await new Promise<Language>((resolve, reject) => {
            this.props.getCurrentLanguageSync({
                onSuccess: resolve,
                onError: reject
            });
        });
    }

    public render = () => {
        return (
            <div id='app'>
                <Routes />
            </div>
        );
    }
}
