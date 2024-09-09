/**
 * App Config File
 */
const AppConfig = {
    brandName: 'Calton', // Brand Name
    locale: {
        languageId: 'italian',
        locale: 'it',
        name: 'Italiano',
        icon: 'it',
    },
    namespace: '3feecb93-ff88-44e6-b89a-1bc33313df4f',
    getLinkForTrust: (location: string) =>
        `https://authenticate.trustpilot.com/?client_id=6IAQRDyF3NcFhCMoHvoq9rZMb6QAEXXa&redirect_uri=https://${location}/chooseLocations&response_type=code`,
    codesurvey: [4],
    codesource: [0, 1, 2, 3],
    codecompetitor: [0, 1, 2, 3, 5],
    codeonlycompetitor: [5],
    codelisting: [6],
    enableUserTour: false, // Enable / Disable User Tour
    copyRightText: 'Calton © 2021 All Rights Reserved.', // Copy Right Text
    // light theme colors
    themeColors: {
        primary: '#3F49FC',
        secondary: '#677080',
        success: '#00D014',
        settings: '#2EC4B6',
        danger: '#FF3739',
        warning: '#FFB70F',
        info: '#00D0BD',
        dark: '#464D69',
        default: '#FAFAFA',
        greyLighten: '#A5A7B2',
        grey: '#677080',
        white: '#FFFFFF',
        purple: '#896BD6',
        yellow: '#D46B08',
        positive: '#34E0A1',
        negative: '#ff6960',
        neutrale: '#FCC207',
        red: '#FF3739',
        green: '#00E500',
        violet: '#EE82EE',
        lightBlue: '#9FC5E8',
        magenta: '#FF00FF',
        realYellow: '#F2EA03',
    },
    // dark theme colors
    darkThemeColors: {
        darkBgColor: '#424242',
    },
    epProd: 'api-voixhub-prod.herokuapp.com',
    epDemo: 'api-voixhub-test.herokuapp.com',
    hotjarProd: 2397338,
    hotjarDemo: 2314041,
    chipSentimentData: [
        { id: '1', name: 'Negativi', color: '#FF6960', chipFlag: false },
        { id: '2', name: 'Neutri', color: '#FCC207', chipFlag: false },
        { id: '3', name: 'Positivi', color: '#34E0A1', chipFlag: false },
    ],
    googlePlaces: {
        apiKey: 'AIzaSyABoAdldQ1V_qVTnfNQCYbd4LmhYor5HCI',
    },
}

export default AppConfig
