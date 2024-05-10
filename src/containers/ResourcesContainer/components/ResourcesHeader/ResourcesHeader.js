import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {HeaderText, SubHeaderText} from '../../../../styles/commonStyles';
import {useTranslation} from '../../../../customHooks/useTranslation';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader({lang = 'en-US'}) {
    const { t, translationLoaded } = useTranslation({
        lang,
        loadTranslationsFile: () => import(`./locales/${lang}/strings.json`),
        componentId: 'RESOURCES_HEADER'
    });
    if (!translationLoaded) {
        return null;
    }

    return (
        <>
            <ResourceHeaderText>{t('TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE')}</SubHeaderText>
        </>
    );
}

ResourcesHeader.propTypes = {
    lang: PropTypes.string
};
