import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {HeaderText, SubHeaderText} from '../../../../styles/commonStyles';
import {subscribe, useComponentTranslation} from '../../../../customHooks/useComponentTranslation';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader({lang = 'en-US'}) {
    const [_, setForceUpdate] = useState(false);
    useEffect(() => {
        const subscription = subscribe('RESOURCES_HEADER_SHOULD_RERENDER', () => {
            setForceUpdate(prevState => !prevState);
        });
        return () => {
          subscription.unsubscribe();
        };
    }, []);

    const { t } = useComponentTranslation({
        lang,
        namespace: 'RESOURCES_HEADER',
        loadTranslationsFile: () => import(`./locales/${lang}/strings.json`)
    });

    const translationOptions = { lng: lang, ns: 'RESOURCES_HEADER' };    
    return (
        <>
            <ResourceHeaderText>{t('TITLE', translationOptions)}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE', translationOptions)}</SubHeaderText>
        </>
    );
}

ResourcesHeader.propTypes = {
    lang: PropTypes.string
};
