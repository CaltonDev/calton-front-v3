/**
 * Change all chart colors
 */
import AppConfig from './AppConfig'

const {
    primary,
    info,
    danger,
    success,
    warning,
    purple,
    secondary,
    yellow,
    white,
    greyLighten,
    grey,
    red,
    green,
    violet,
    lightBlue,
    magenta,
    realYellow,
} = AppConfig.themeColors

const ChartConfig = {
    color: {
        primary: primary,
        info: info,
        warning: warning,
        danger: danger,
        success: success,
        default: '#DEE4E8',
        purple: purple,
        secondary: secondary,
        yellow: yellow,
        white: '#FFFFFF',
        dark: white,
        greyLighten: greyLighten,
        grey: grey,
        test: '',
        positive: '#34e0a1',
        negative: '#ff6960',
        neutrale: '#fcc207',
        main: '#255aee',
        red: red,
        green: green,
        violet: violet,
        lightBlue: lightBlue,
        magenta: magenta,
        realYellow: realYellow,
    },
    legendFontColor: '#AAAEB3', // only works on react chart js 2
    chartGridColor: '#EAEAEA',
    axesColor: '#657786',
    shadowColor: 'rgba(0,0,0,0.6)',
    MyChartColors: [
        '#449DD1',
        '#3F51B5',
        '#F86624',
        '#EA3546',
        '#662E9B',
        '#7D02EB',
        '#C5D86D',
        '#D4526E',
        '#E2C044',
        '#4CAF50',
        '#5C4742',
        '#A5978B',
    ],
    MyChartColorsRatings: [
        '#AF3E5B',
        '#452D4E',
        '#549EC4',
        '#5ECDC0',
        '#FD8C8C',
    ],
    SentColors: ['#47a447', '#ed9c28', '#d2322d'],
}

// Tooltip Styles
export const tooltipStyle = {
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '1px solid rgba(0,0,0,0.6)',
    borderRadius: '5px',
}

export const tooltipTextStyle = {
    color: '#FFF',
    fontSize: '12px',
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: '1',
}

export default ChartConfig
