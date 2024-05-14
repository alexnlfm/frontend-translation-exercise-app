import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SectionHeader from '../SectionHeader/SectionHeader';
import {ReadOnlyTextArea, TextField} from '../../../fields';
import {subscribe, useComponentTranslation} from '../../../../customHooks/useComponentTranslation';

const SectionContainer = styled.div`
    width: 60%;
    border-right: 1px solid lightgray;
    padding: 0 12px 5px;
    min-height: 100%;
`;

const FieldsContainer = styled.div`
    margin-top: 6px;
`;

export default function GeneralDetailsSection({resource, lang = 'en-US'}) {
    const [_, setForceUpdate] = useState(false);
    useEffect(() => {
        const subscription = subscribe('GENERAL_DETAILS_SECTION_SHOULD_RERENDER', () => {
            setForceUpdate(prevState => !prevState);
        });
        return () => {
          subscription.unsubscribe();
        };
    }, []);

    const { t } = useComponentTranslation({
        lang,
        namespace: 'GENERAL_DETAILS_SECTION',
        loadTranslationsFile: () => import(`./locales/${lang}/strings.json`)
    });
    
    const translationOptions = { lng: lang, ns: 'GENERAL_DETAILS_SECTION' };
    const sectionHeaderProps = {
        headerText: t('TITLE', translationOptions),
        subHeaderText: t('SUB_TITLE', translationOptions)
    };
    const {name, description, resourceType, path} = resource;
    const nameProps = {
        value: name,
        label: t('FIELD_TITLE_NAME', translationOptions)
    };
    const descriptionProps = {
        value: description,
        label: t('FIELD_TITLE_DESCRIPTION', translationOptions)
    };
    const resourceTypeProps = {
        value: resourceType,
        label: t('FIELD_TITLE_RESOURCE_TYPE', translationOptions)
    };
    const pathProps = {
        value: path,
        label: t('FIELD_TITLE_RESOURCE_PATH', translationOptions)
    };    
    return (
        <SectionContainer>
            <SectionHeader {...sectionHeaderProps} />
            <FieldsContainer>
                <TextField {...nameProps} />
                <ReadOnlyTextArea {...descriptionProps} />
                <TextField {...resourceTypeProps} />
                <TextField {...pathProps} />
            </FieldsContainer>
        </SectionContainer>
    );
}

GeneralDetailsSection.propTypes = {
    resource: PropTypes.object,
    lang: PropTypes.string
};
