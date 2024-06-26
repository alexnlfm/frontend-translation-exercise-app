import React from 'react';
import PropTypes from 'prop-types';
import {throttle} from 'throttle-debounce';
import ResourcesFilterField from './components/ResourcesFilterField/ResourcesFilterField';
import ResourcesHeader from './components/ResourcesHeader/ResourcesHeader';
import ResourcesList from './components/ResourcesList/ResourcesList';
import styled from 'styled-components';

const AsideContainer = styled.aside`
  width: 300px;
  padding-left: 1px;
`;

const FilterAndHeaderContainer = styled.div`
  padding: 10px;
`;

export default class ResourcesContainer extends React.Component {
    onFilteredValueChange = event => {
        const {
            target: {value: filteredValue}
        } = event;

        this.setState({filteredValue});
        this.filterResourcesThrottled(filteredValue);
    };

    constructor(props) {
        super(props);

        this.state = {
            filteredValue: ''
        };

        this.filterResourcesThrottled = throttle(300, this.props.filterResources);
    }

    render() {
        const {
            props: {resources, selectResource, selectedResourceId, currentLang},
            state: {filteredValue},
            onFilteredValueChange
        } = this;
        const filterFieldProps = {
            onChange: onFilteredValueChange,
            value: filteredValue
        };
        const resourcesListProps = {
            resources,
            selectResource,
            selectedResourceId
        };
        return (
            <AsideContainer>
                <FilterAndHeaderContainer>
                    <ResourcesHeader lang={currentLang} />
                    <ResourcesFilterField {...filterFieldProps} />
                </FilterAndHeaderContainer>
                <nav>
                    <ResourcesList {...resourcesListProps} />
                </nav>
            </AsideContainer>
        );
    }
}

ResourcesContainer.propTypes = {
    resources: PropTypes.array,
    selectResource: PropTypes.func,
    selectedResourceId: PropTypes.string,
    filterResources: PropTypes.func
};
