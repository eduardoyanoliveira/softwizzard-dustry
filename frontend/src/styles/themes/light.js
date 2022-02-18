import * as colors from '../../design/colors';
import * as typography from '../../design/typography';

export default {
    title: 'light',
    colors: {
        primary: colors.primaryColors.primary,
        primaryTransparent : colors.primaryColors.primaryTransparent,
        primaryNeon: colors.primaryColors.primaryNeon,
        componentTitle: colors.primaryColors.primaryPlusOne, 
        fontHighEmphasis: colors.typographyDarkColors.highEmphasis, // componentContent | IconColorEmphasis
        fontMediumEmphasis: colors.typographyDarkColors.mediumEmphasis, // textAlt
        fontDisabled: colors.typographyDarkColors.disabled, // iconColor
        success: colors.utilitaryColors.success,
        successTransparent: colors.utilitaryColors.successTransparent,
        successNeon: colors.utilitaryColors.successNeon,
        alert: colors.utilitaryColors.alert,
        warning: colors.utilitaryColors.warning,
        background: colors.lightColors.background,
        backgroundLight: colors.lightColors.backgroundLight,
        backgroundDark: colors.lightColors.backgroundDark,
    },
    fonts:{
        headerOne: typography.headerOne,
        headerTwo: typography.headerTwo,
        headerThree: typography.headerThree,
        headerFour: typography.headerFour,
        headerFive: typography.headerFive,
        headerSix: typography.headerSix,
        body: typography.body,
        bodyTwo: typography.bodyTwo,
        subtitle: typography.subtitle,
        subtitleTwo: typography.subtitleTwo,
        button: typography.button,
        caption: typography.caption,
    }
}