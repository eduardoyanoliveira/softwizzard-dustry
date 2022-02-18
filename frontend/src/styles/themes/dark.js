import * as colors from '../../design/colors';
import * as typography from '../../design/typography';

export default {
    title: 'dark',
    colors: {
        primary: colors.primaryColors.primary,
        primaryTransparent : colors.primaryColors.primaryTransparent,
        primaryNeon: colors.primaryColors.primaryNeon,
        componentTitle: colors.primaryColors.primaryLessOne,
        fontHighEmphasis: colors.typographyLightColors.highEmphasis, // componentContent | IconColorEmphasis
        fontMediumEmphasis: colors.typographyLightColors.mediumEmphasis, // textAlt
        fontDisabled: colors.typographyLightColors.disabled, // iconColor
        success: colors.utilitaryColors.success,
        successTransparent: colors.utilitaryColors.successTransparent,
        successNeon: colors.utilitaryColors.successNeon,
        alert: colors.utilitaryColors.alert,
        warning: colors.utilitaryColors.warning,
        background: colors.darkColors.background,
        backgroundLight: colors.darkColors.backgroundLight,
        backgroundDark: colors.darkColors.backgroundDark,
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