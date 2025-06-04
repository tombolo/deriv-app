import { isBot } from '../platform';
import { isStaging } from '../url/helpers';

/*
 * Configuration values needed in js codes
 *
 * NOTE:
 * Please use the following command to avoid accidentally committing personal changes
 * git update-index --assume-unchanged packages/shared/src/utils/config.js
 *
 */

export const livechat_license_id = 12049137;
export const livechat_client_id = '66aa088aad5a414484c1fd1fa8a5ace7';

export const domain_app_ids = {
    // these domains as supported "production domains"
    'gletraders.com': 80359, // Added your domain with the specified app ID
    'deriv.app': 80359, // Changed to your app ID
    'app.deriv.com': 80359, // Changed to your app ID
    'staging-app.deriv.com': 80359, // Changed to your app ID
    'app.deriv.me': 80359, // Changed to your app ID
    'staging-app.deriv.me': 80359, // Changed to your app ID
    'app.deriv.be': 80359, // Changed to your app ID
    'staging-app.deriv.be': 80359, // Changed to your app ID
    'binary.com': 80359, // Changed to your app ID
    'test-app.deriv.com': 80359, // Changed to your app ID
};

export const platform_app_ids = {
    derivgo: 80359, // Changed to your app ID
};

export const getCurrentProductionDomain = () =>
    !/^staging\./.test(window.location.hostname) &&
    Object.keys(domain_app_ids).find(domain => window.location.hostname === domain);

export const isProduction = () => {
    const all_domains = Object.keys(domain_app_ids).map(domain => `(www\\.)?${domain.replace('.', '\\.')}`);
    return new RegExp(`^(${all_domains.join('|')})$`, 'i').test(window.location.hostname);
};

export const isTestLink = () => {
    return /^((.*)\.binary\.sx)$/i.test(window.location.hostname);
};

export const isLocal = () => /localhost(:\d+)?$/i.test(window.location.hostname);

/**
 * @deprecated Please use 'WebSocketUtils.getAppId' from '@deriv-com/utils' instead of this.
 */
export const getAppId = () => {
    let app_id = null;
    const user_app_id = '80359'; // Set to your app ID
    const config_app_id = window.localStorage.getItem('config.app_id');
    const current_domain = getCurrentProductionDomain() || '';
    window.localStorage.removeItem('config.platform'); // Remove config stored in localstorage if there's any.
    const platform = window.sessionStorage.getItem('config.platform');
    const is_bot = isBot();

    // Added platform at the top since this should take precedence over the config_app_id
    if (platform && platform_app_ids[platform as keyof typeof platform_app_ids]) {
        app_id = platform_app_ids[platform as keyof typeof platform_app_ids];
    } else if (config_app_id) {
        app_id = config_app_id;
    } else if (user_app_id.length) {
        window.localStorage.setItem('config.default_app_id', user_app_id);
        app_id = user_app_id;
    } else if (isStaging()) {
        window.localStorage.removeItem('config.default_app_id');
        app_id = is_bot ? 80359 : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 80359;
    } else if (/localhost/i.test(window.location.hostname)) {
        app_id = 80359;
    } else {
        window.localStorage.removeItem('config.default_app_id');
        app_id = is_bot ? 80359 : domain_app_ids[current_domain as keyof typeof domain_app_ids] || 80359;
    }

    return app_id;
};

export const getSocketURL = (is_wallets = false) => {
    const local_storage_server_url = window.localStorage.getItem('config.server_url');
    if (local_storage_server_url) return local_storage_server_url;

    let active_loginid_from_url;
    const search = window.location.search;
    if (search) {
        const params = new URLSearchParams(document.location.search.substring(1));
        active_loginid_from_url = params.get('acct1');
    }
    const local_storage_loginid = is_wallets
        ? window.sessionStorage.getItem('active_wallet_loginid') || window.localStorage.getItem('active_wallet_loginid')
        : window.sessionStorage.getItem('active_loginid') || window.localStorage.getItem('active_loginid');
    const loginid = local_storage_loginid || active_loginid_from_url;
    const is_real = loginid && !/^(VRT|VRW)/.test(loginid);

    const server = is_real ? 'green' : 'blue';
    const server_url = `${server}.derivws.com`;

    return server_url;
};

export const checkAndSetEndpointFromUrl = () => {
    if (isTestLink()) {
        const url_params = new URLSearchParams(location.search.slice(1));

        if (url_params.has('qa_server') && url_params.has('app_id')) {
            const qa_server = url_params.get('qa_server') || '';
            const app_id = url_params.get('app_id') || '';

            url_params.delete('qa_server');
            url_params.delete('app_id');

            if (/^(^(www\.)?qa[0-9]{1,4}\.deriv.dev|(.*)\.derivws\.com)$/.test(qa_server) && /^[0-9]+$/.test(app_id)) {
                localStorage.setItem('config.app_id', app_id);
                localStorage.setItem('config.server_url', qa_server);
            }

            const params = url_params.toString();
            const hash = location.hash;

            location.href = `${location.protocol}//${location.hostname}${location.pathname}${params ? `?${params}` : ''
                }${hash || ''}`;

            return true;
        }
    }

    return false;
};

export const getDebugServiceWorker = () => {
    const debug_service_worker_flag = window.localStorage.getItem('debug_service_worker');
    if (debug_service_worker_flag) return !!parseInt(debug_service_worker_flag);

    return false;
};