import { css } from 'docz-plugin-css';

export default {
    plugins: [
        css({
            preprocessor: 'sass'
        })
    ],
    themeConfig: {
        logo: {
            src: '//a.vsstatic.com/common/favicon/apple-touch-icon.png',
            width: 180
        },
        styles: {
            body: {
                fontFamily: "'Roboto', 'Arial', 'Helvetica', 'sans-serif"
            }
        }
    }
};
