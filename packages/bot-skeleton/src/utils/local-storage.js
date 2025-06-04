import { save_types } from '../constants/save-type';

// Function to fetch XML content from public folder
const fetchBotXml = async botName => {
    try {
        const response = await fetch(`/bots/${botName}.xml`);
        if (!response.ok) {
            throw new Error(`Failed to load ${botName} bot`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error loading ${botName} bot:`, error);
        return `<xml xmlns="https://developers.google.com/blockly/xml" is_dbot="true">
                  <!-- Error loading ${botName} bot -->
                </xml>`;
    }
};

// Static bot definitions with async XML loading
const getStaticBots = async () => {
    const [dollarMinerXml, dollarFlipperXml, fastMoneyProXml, derivMinerProXml] = await Promise.all([
        fetchBotXml('dollar_miner'),
        fetchBotXml('dollar_flipper'),
        fetchBotXml('fast_money_pro'),
        fetchBotXml('deriv_miner_pro'),
    ]);

    return [
        {
            id: 'dollar_miner',
            name: 'paigey over 0 ai bot 25',
            xml: dollarMinerXml,
            timestamp: Date.now(),
            save_type: save_types.LOCAL,
        },
        {
            id: 'dollar_flipper',
            name: 'paigey under 7 ai bot 25',
            xml: dollarFlipperXml,
            timestamp: Date.now(),
            save_type: save_types.LOCAL,
        },
        {
            id: 'fast_money_pro_',
            name: 'FPaigeys matches bot 2025',
            xml: fastMoneyProXml,
            timestamp: Date.now(),
            save_type: save_types.LOCAL,
        },
        {
            id: 'deriv_miner_pro',
            name: 'paigeys new ai bot 2025',
            xml: derivMinerProXml,
            timestamp: Date.now(),
            save_type: save_types.LOCAL,
        },
    ];
};

// Replace getSavedWorkspaces to return static bots
export const getSavedWorkspaces = async () => {
    return await getStaticBots();
};
