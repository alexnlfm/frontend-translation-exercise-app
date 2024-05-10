import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {HeaderText, SubHeaderText} from '../../../../styles/commonStyles';
import {useTranslation} from '../../../../customHooks/useTranslation';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader({lang = 'en-US'}) {
    const [translationStrings, setTranslationStrings] = useState({});
    useEffect(() => {
        async function asyncFunc() {
            const { default: translationObj } = await import(`./locales/${lang}/strings.json`);
            setTranslationStrings(translationObj);
        };
        asyncFunc();
    }, [lang]);

    const { t, translationLoaded } = useTranslation(lang, translationStrings);
    if (!translationLoaded) {
        return null;
    }

    return (
        <>
            <ResourceHeaderText>{t('RESOURCES_HEADER_TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('RESOURCES_HEADER_SUBTITLE')}</SubHeaderText>
        </>
    );
}

ResourcesHeader.propTypes = {
    lang: PropTypes.string
};
